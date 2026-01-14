import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { Discount } from "../models/Discount";
import { IUser } from "models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface CaratOption {
  carat: string | number;
  diamondCategory?: string[];
  diamondWeight?: number[];
  diamondRate?: number[];
  diamondAmt?: number[];
  metalAmt?: number;
  labourAmt?: number;
}


// Updated to accept the requested weight for dynamic calculations
const calculateDiamondPrice = (caratObj: any, requestedCarat: number) => {
  const {
    diamondCategory = [],
    diamondWeight = [],
    diamondRate = [],
    diamondAmt = [],
    metalAmt = 0,
    labourAmt = 0,
  } = caratObj;

  let recalculatedDiamondTotal = 0;
  let fixedDiamondTotal = 0;

  diamondCategory.forEach((cat: string, index: number) => {
    const rate = parseFloat(diamondRate[index]) || 0;

    // MATCH FRONTEND LOGIC: 
    // If category is d6-d10, multiply Rate by the user's SELECTED carat
    if (/^d([6-9]|10)$/i.test(cat)) {
      recalculatedDiamondTotal += rate * requestedCarat;
    } else {
      // Otherwise use the fixed amount from the DB
      fixedDiamondTotal += parseFloat(diamondAmt[index]) || 0;
    }
  });

  return Math.round(metalAmt + labourAmt + fixedDiamondTotal + recalculatedDiamondTotal);
};

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const {
    productId,
    metal,
    color,
    shape,
    carat,
    size,
    quantity = 1,
  } = req.body;

  // 1. Fetch the product and convert to plain object to avoid Mongoose proxy issues
  const productDoc = await Product.findById(productId);
  if (!productDoc) return res.status(404).json({ success: false, message: "Product not found" });

  const product = productDoc.toObject(); // Convert to plain JS object

  // 2. Find Variation
  const variation = product.variations.find(
    (v: any) => v.metal.toLowerCase() === metal.toLowerCase() &&
      v.color.toLowerCase() === color.toLowerCase()
  );
  if (!variation) return res.status(404).json({ success: false, message: "Variation not found" });

  // 3. Find Shape
  let shapeObj = variation.shapes.find(
    (s: any) => s.shape.toLowerCase() === shape.toLowerCase()
  );
  if (!shapeObj) {
    // Fallback: allow any shape if D6–D10 exists
    shapeObj = variation.shapes.find((s: any) =>
      s.carats?.some((c: any) =>
        c.diamondCategory?.some((cat: any) =>
          /^d(6|7|8|9|10)$/i.test(String(cat).trim())
        )
      )
    );
  }

  if (!shapeObj) return res.status(404).json({ success: false, message: "Shape not found" });

  const reqCaratNum = parseFloat(String(carat));

  // 4. Find Carat Object
  // First attempt: Exact match
  let caratObj = shapeObj.carats.find((c: any) => {
    const dbCarat = parseFloat(String(c.carat));
    return dbCarat.toFixed(3) === reqCaratNum.toFixed(3);
  });

  // Second attempt: Fallback for dynamic carats (D6-D10)
  if (!caratObj) {
    caratObj = shapeObj.carats.find((c: any) => {
      if (!c.diamondCategory || !Array.isArray(c.diamondCategory)) return false;

      return c.diamondCategory.some((cat: any) => {
        const catStr = String(cat).toLowerCase().trim();
        // More robust check: starts with 'd' and is followed by 6, 7, 8, 9, or 10
        const match = catStr.match(/^d(6|7|8|9|10)$/);
        return !!match;
      });
    });
  }

  // Final check
  if (!caratObj) {
    return res.status(404).json({
      success: false,
      message: "Carat not found 1",
    });
  }

  // 5. Calculate Price (using the function you provided)
  const calculatedPrice = calculateDiamondPrice(caratObj, reqCaratNum);

  // 6. Cart Management
  let cart = await Cart.findOne({ user: userId });

  const newItem = {
    product: productId,
    metal,
    color,
    designType: product.designType,
    style: product.style,
    stone: product.stone,
    shape,
    carat: reqCaratNum,
    size,
    quantity,
    price: calculatedPrice,
  };

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [newItem] });
  } else {
    const existingItemIndex = cart.items.findIndex(
      (item: any) =>
        item.product.toString() === productId &&
        item.metal.toLowerCase() === metal.toLowerCase() &&
        item.color.toLowerCase() === color.toLowerCase() &&
        item.shape.toLowerCase() === shape.toLowerCase() &&
        parseFloat(String(item.carat)).toFixed(3) === reqCaratNum.toFixed(3) &&
        item.size === size
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = calculatedPrice;
    } else {
      cart.items.push(newItem);
    }
    await cart.save();
  }

  return res.status(200).json({ success: true, message: "Item added to cart", data: cart });
});




export const removeFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { productId, metal, color, shape, carat, size } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.metal === metal &&
          item.color === color &&
          item.shape === shape &&
          item.carat === carat &&
          item.size === size
        )
    );

    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Item removed from cart", data: cart });
  }
);

export const updateCartItem = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { productId, metal, color, shape, carat, size, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.metal === metal &&
        item.color === color &&
        item.shape === shape &&
        item.carat === carat &&
        item.size === size
    );

    if (itemIndex === -1)
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Cart updated", data: cart });
  }
);

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    model: Product,
    select: "title slug variations category designType style stone",
  });

  if (!cart || cart.items.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Cart is empty",
      data: { items: [], subtotal: 0, finalTotal: 0 },
    });
  }

  // 1. Fetch Discount Info
  let discount: any = null;
  if (cart.discountCode) {
    const found = await Discount.findOne({
      code: cart.discountCode.trim().toUpperCase(),
      publish: true,
    }).lean();
    if (found) {
      discount = {
        code: found.code,
        labDiscount: found.labDiscount || 0,
        diamondDiscount: found.diamondDiscount || 0,
      };
    } else {
      cart.discountCode = null; // Remove invalid code
    }
  }

  // 2. Refine Items with Dynamic Calculation
  const refinedItems = cart.items.map((item: any) => {
    const product = item.product as any;
    if (!product || !product.variations) return item.toObject();

    const variation = product.variations.find(
      (v: any) => v.metal === item.metal && v.color === item.color
    );

    let metalAmt = 0, labourAmt = 0, diamondAmtTotal = 0, totalAmt = 0, image = null;

    if (variation) {
      let shapeObj = variation.shapes.find(
        (s: any) => s.shape.toLowerCase() === item.shape.toLowerCase()
      );

      if (!shapeObj) {
        // Allow any shape if dynamic diamonds exist
        shapeObj = variation.shapes.find((s: any) =>
          s.carats?.some((c: any) =>
            c.diamondCategory?.some((cat: string) =>
              /^d([6-9]|10)$/i.test(cat)
            )
          )
        );
      }

      if (shapeObj) {
        image = shapeObj.images?.[0] || null;

        // --- DYNAMIC CARAT FINDING (Same as addToCart) ---
        const reqCarat = parseFloat(String(item.carat));

        // Try exact match first
        let caratObj = shapeObj.carats.find(
          (c: any) => parseFloat(String(c.carat)).toFixed(3) === reqCarat.toFixed(3)
        );

        // Fallback to D6-D10 template if no exact match
        if (!caratObj) {
          caratObj = shapeObj.carats.find((c: any) =>
            c.diamondCategory?.some((cat: string) => /^d([6-9]|10)$/i.test(cat))
          );
        }

        if (caratObj) {
          const qty = item.quantity || 1;
          metalAmt = (caratObj.metalAmt || 0) * qty;
          labourAmt = (caratObj.labourAmt || 0) * qty;

          // Calculate Diamond Total based on category
          let itemDiamondTotal = 0;
          caratObj.diamondCategory.forEach((cat: string, idx: number) => {
            if (/^d([6-9]|10)$/i.test(cat)) {
              // Dynamic logic: Rate * User's Carat Selection
              itemDiamondTotal += (caratObj.diamondRate[idx] || 0) * reqCarat;
            } else {
              // Fixed logic: DB Amount
              itemDiamondTotal += (caratObj.diamondAmt[idx] || 0);
            }
          });

          diamondAmtTotal = itemDiamondTotal * qty;
          totalAmt = metalAmt + labourAmt + diamondAmtTotal;
        }
      }
    }

    // 3. Apply Discounts
    const labDiscountAmt = discount ? (labourAmt * discount.labDiscount) / 100 : 0;
    const diamondDiscountAmt = discount ? (diamondAmtTotal * discount.diamondDiscount) / 100 : 0;
    const totalDiscountAmt = labDiscountAmt + diamondDiscountAmt;
    const finalAmt = totalAmt - totalDiscountAmt;

    return {
      ...item.toObject(),
      product: {
        _id: product._id,
        title: product.title,
        slug: product.slug,
        category: product.category,
        image,
      },
      priceDetails: {
        metalAmt: Math.round(metalAmt),
        labourAmt: Math.round(labourAmt),
        diamondAmtTotal: Math.round(diamondAmtTotal),
        totalAmt: Math.round(totalAmt),
        labDiscountAmt: Math.round(labDiscountAmt),
        diamondDiscountAmt: Math.round(diamondDiscountAmt),
        totalDiscountAmt: Math.round(totalDiscountAmt),
        finalAmt: Math.round(finalAmt),
      },
    };
  });

  // 4. Calculate Cart Totals
  const subtotal = refinedItems.reduce((acc, item) => acc + (item.priceDetails?.totalAmt || 0), 0);
  const totalLabDiscount = refinedItems.reduce((acc, item) => acc + (item.priceDetails?.labDiscountAmt || 0), 0);
  const totalDiamondDiscount = refinedItems.reduce((acc, item) => acc + (item.priceDetails?.diamondDiscountAmt || 0), 0);
  const totalDiscount = totalLabDiscount + totalDiamondDiscount;
  const finalTotal = subtotal - totalDiscount;

  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: {
      items: refinedItems,
      subtotal,
      totalLabDiscount,
      totalDiamondDiscount,
      totalDiscount,
      finalTotal,
      discountInfo: discount,
    },
  });
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId });
  if (!cart)
    return res.status(404).json({ success: false, message: "Cart not found" });
  cart.items = [];
  await cart.save();
  return res
    .status(200)
    .json({ success: true, message: "Cart cleared", data: cart });
});

export const applyDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Discount code is required",
      });
    }

    const discount = await Discount.findOne({
      code: code.trim().toUpperCase(),
      publish: true,
    }).lean();

    if (!discount) {
      return res.status(400).json({
        success: false,
        message: "Invalid or inactive discount code",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.discountCode = discount.code;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Discount applied successfully",
      discount: {
        code: discount.code,
        labDiscount: discount.labDiscount,
        diamondDiscount: discount.diamondDiscount,
      },
    });
  }
);

export const removeDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.discountCode = null;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Discount removed successfully",
    });
  }
);
