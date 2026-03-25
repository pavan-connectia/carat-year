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

// /**
//  * 1. SHARED SEARCH LOGIC
//  * Finds the correct pricing data row. 
//  * If the user picks 1.4ct and we only have a 1.0ct row, it falls back to the 1.0ct row 
//  * so we can use its 'Rate' for the calculation.
//  */
// const getCaratPricingData = (shapeObj: any, requestedCarat: number) => {
//   // Try Exact Match (e.g., 1.0 === 1.0)
//   let caratObj = shapeObj.carats.find((c: any) => {
//     const dbCarat = parseFloat(String(c.carat));
//     return dbCarat.toFixed(3) === requestedCarat.toFixed(3);
//   });

//   // Fallback: Find the record that contains dynamic pricing categories (D1-D10)
//   if (!caratObj) {
//     caratObj = shapeObj.carats.find((c: any) =>
//       c.diamondCategory?.some((cat: any) =>
//         /^D([1-9]|10)$/i.test(String(cat).trim())
//       )
//     );
//   }
//   return caratObj;
// };

/**
 * 2. SHARED CALCULATION LOGIC
 * Handles the math for Metal, Labour, Fixed Diamonds, and Dynamic Diamonds (D1-D10).
 */
const calculateDiamondPrice = (caratObj: any, requestedCarat: number) => {
  const {
    diamondCategory = [],
    diamondRate = [],
    diamondAmt = [],
    metalAmt = 0,
    labourAmt = 0,
  } = caratObj;

  let recalculatedDiamondTotal = 0;
  let fixedDiamondTotal = 0;

  diamondCategory.forEach((cat: string, index: number) => {
    const categoryName = String(cat).trim().toUpperCase();
    const rate = parseFloat(diamondRate[index]) || 0;

    // D1 through D10: If a Rate exists, multiply by requested carat.
    // This ensures center stones (D1) and side stones (D2-D10) all scale correctly.
    const isDynamic = /^D([2-9]|10|1[6-9]|20)$/.test(categoryName);

    if (isDynamic && rate > 0) {
      recalculatedDiamondTotal += rate * requestedCarat;
    } else {
      // Otherwise use the fixed amount stored in the database
      fixedDiamondTotal += parseFloat(diamondAmt[index]) || 0;
    }
  });

  const total =
    (parseFloat(metalAmt) || 0) +
    (parseFloat(labourAmt) || 0) +
    fixedDiamondTotal +
    recalculatedDiamondTotal;

  return Math.round(total || 0);
};

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
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
          /^D(1[6-9]|2[0-9]|30)$/i.test(String(cat).trim())
        )
      )
    );
  }

  if (!shapeObj) return res.status(404).json({ success: false, message: "Shape not found" });

  const reqCaratNum = parseFloat(String(carat));

  // 4. Find Carat Object
  let caratObj = shapeObj.carats.find((c: any) => {
    const dbCarat = parseFloat(String(c.carat));
    return dbCarat.toFixed(3) === reqCaratNum.toFixed(3);
  });

  // Fallback search: find the first carat record that handles dynamic pricing
  if (!caratObj) {
    caratObj = shapeObj.carats.find((c: any) => {
      if (!c.diamondCategory) return false;
      return c.diamondCategory.some((cat: any) =>
        /^D(1[6-9]|2[0-9]|30)$/i.test(String(cat).trim())
      );
    });
  }

  if (!caratObj) {
    return res.status(404).json({ success: false, message: "Pricing tier not found" });
  }

  const calculatedPrice = calculateDiamondPrice(caratObj, reqCaratNum);

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

  if (!userId) {
    return res.status(200).json({
      success: true,
      message: "Price calculated (Guest Mode)",
      data: { guestItem: newItem }
    });
  }

  // 6. Cart Management
  let cart = await Cart.findOne({ user: userId });

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
    const userId = req.user?._id;
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
    const userId = req.user?._id;
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
  const userId = req.user?._id;

  let rawItems = [];
  let discountCode = null;

  // 1. Identify Data Source
  if (userId) {
    // Logged in: Get from Database
    const cart = await Cart.findOne({ user: userId });
    rawItems = cart?.items || [];
    discountCode = cart?.discountCode;
  } else {
    // Guest: Get from Request Body (Frontend sends localStorage items here)
    rawItems = req.body.items || [];
    discountCode = req.body.discountCode || null;
  }

  if (!rawItems || rawItems.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Cart is empty",
      data: { items: [], subtotal: 0, finalTotal: 0 },
    });
  }

  // 2. Fetch Discount Info
  let discount: any = null;
  if (discountCode) {
    const found = await Discount.findOne({
      code: discountCode.trim().toUpperCase(),
      publish: true,
    }).lean();
    if (found) {
      discount = {
        code: found.code,
        labDiscount: found.labDiscount || 0,
        diamondDiscount: found.diamondDiscount || 0,
      };
    }
  }

  // 3. Refine Items with Dynamic Calculation
  // We use Promise.all because we need to fetch product info for guest items
  const refinedItems = await Promise.all(rawItems.map(async (item: any) => {
    // If it's a guest item, 'product' is just an ID string. If DB item, it's an object.
    const productId = item.product._id || item.product;

    const productDoc = await Product.findById(productId).select("title slug variations category designType style stone").lean();
    if (!productDoc) return null;

    const variation = productDoc.variations.find(
      (v: any) => v.metal.toLowerCase() === item.metal.toLowerCase() &&
        v.color.toLowerCase() === item.color.toLowerCase()
    );

    let metalAmt = 0, labourAmt = 0, diamondAmtTotal = 0, totalAmt = 0, image = null;

    if (variation) {
      let shapeObj = variation.shapes.find(
        (s: any) => s.shape.toLowerCase() === item.shape.toLowerCase()
      );

      if (!shapeObj) {
        shapeObj = variation.shapes.find((s: any) =>
          s.carats?.some((c: any) =>
            c.diamondCategory?.some((cat: string) => /^d(1[6-9]|2[0-9]|30)$/i.test(cat))
          )
        );
      }

      if (shapeObj) {
        image = shapeObj.images?.[0] || null;
        const reqCarat = parseFloat(String(item.carat));

        let caratObj = shapeObj.carats.find(
          (c: any) => parseFloat(String(c.carat)).toFixed(3) === reqCarat.toFixed(3)
        );

        if (!caratObj) {
          caratObj = shapeObj.carats.find((c: any) =>
            c.diamondCategory?.some((cat: string) => /^d(1[6-9]|2[0-9]|30)$/i.test(cat))
          );
        }

        if (caratObj) {
          const qty = item.quantity || 1;
          metalAmt = (caratObj.metalAmt || 0) * qty;
          labourAmt = (caratObj.labourAmt || 0) * qty;

          let itemDiamondTotal = 0;
          caratObj.diamondCategory.forEach((cat: string, idx: number) => {
            if (/^d(1[6-9]|2[0-9]|30)$/i.test(cat)) {
              itemDiamondTotal += (caratObj.diamondRate[idx] || 0) * reqCarat;
            } else {
              itemDiamondTotal += (caratObj.diamondAmt[idx] || 0);
            }
          });

          diamondAmtTotal = itemDiamondTotal * qty;
          totalAmt = metalAmt + labourAmt + diamondAmtTotal;
        }
      }
    }

    const labDiscountAmt = discount ? (labourAmt * discount.labDiscount) / 100 : 0;
    const diamondDiscountAmt = discount ? (diamondAmtTotal * discount.diamondDiscount) / 100 : 0;
    const totalDiscountAmt = labDiscountAmt + diamondDiscountAmt;
    const finalAmt = totalAmt - totalDiscountAmt;

    return {
      ... (item.toObject ? item.toObject() : item),
      product: {
        _id: productDoc._id,
        title: productDoc.title,
        slug: productDoc.slug,
        category: productDoc.category,
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
  }));

  // Filter out any nulls (products not found)
  const validItems = refinedItems.filter(i => i !== null);

  // 4. Calculate Totals
  const subtotal = validItems.reduce((acc, item) => acc + (item.priceDetails?.totalAmt || 0), 0);
  const totalLabDiscount = validItems.reduce((acc, item) => acc + (item.priceDetails?.labDiscountAmt || 0), 0);
  const totalDiamondDiscount = validItems.reduce((acc, item) => acc + (item.priceDetails?.diamondDiscountAmt || 0), 0);
  const totalDiscount = totalLabDiscount + totalDiamondDiscount;
  const finalTotal = subtotal - totalDiscount;

  return res.status(200).json({
    success: true,
    message: userId ? "Cart fetched from DB" : "Cart calculated for Guest",
    data: {
      items: validItems,
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
  const userId = req.user?._id;
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
    const userId = req.user?._id;
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
    const userId = req.user?._id;
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

export const syncCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { localItems } = req.body;

  if (!localItems || localItems.length === 0) {
    return res.status(200).json({ success: true, message: "Nothing to sync" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: localItems });
  } else {
    localItems.forEach((lItem: any) => {
      const existingItemIndex = cart!.items.findIndex((i: any) => {
        const isSameProduct = i.product.toString() === lItem.product;
        const isSameMetal = i.metal.toLowerCase() === lItem.metal.toLowerCase();
        const isSameColor = i.color.toLowerCase() === lItem.color.toLowerCase();
        const isSameShape = i.shape.toLowerCase() === lItem.shape.toLowerCase();

        const isSameCarat = parseFloat(String(i.carat)).toFixed(3) === parseFloat(String(lItem.carat)).toFixed(3);

        const normalizeSize = (s: any) => (s ? String(s).trim() : "");
        const isSameSize = normalizeSize(i.size) === normalizeSize(lItem.size);

        return (
          isSameProduct &&
          isSameMetal &&
          isSameColor &&
          isSameShape &&
          isSameCarat &&
          isSameSize
        );
      });

      if (existingItemIndex > -1) {
        cart!.items[existingItemIndex].quantity += lItem.quantity;
        if (lItem.price) cart!.items[existingItemIndex].price = lItem.price;
      } else {
        cart!.items.push(lItem);
      }
    });
  }

  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Cart synced successfully",
    data: cart
  });
});
