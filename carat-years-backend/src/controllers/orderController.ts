import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { Address } from "../models/Address";
import { Discount } from "../models/Discount";
import { Order } from "../models/Order";
import { asyncHandler } from "../middlewares/asyncHandler";

const DYNAMIC_DIAMOND_REGEX = /^D(1[6-9]|2[0-9]|30)$/i;

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

    // Logic: D16-D30 scale by weight, others are fixed
    const isDynamic = DYNAMIC_DIAMOND_REGEX.test(categoryName);

    if (isDynamic && rate > 0) {
      recalculatedDiamondTotal += rate * requestedCarat;
    } else {
      fixedDiamondTotal += parseFloat(diamondAmt[index]) || 0;
    }
  });

  const unitTotal =
    (parseFloat(metalAmt) || 0) +
    (parseFloat(labourAmt) || 0) +
    fixedDiamondTotal +
    recalculatedDiamondTotal;

  return {
    unitTotal: Math.round(unitTotal),
    metalAmt: parseFloat(metalAmt) || 0,
    labourAmt: parseFloat(labourAmt) || 0,
    diamondAmtTotal: fixedDiamondTotal + recalculatedDiamondTotal
  };
};

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { addressId, paymentMethod } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    model: Product,
    select: "title slug category variations",
  });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const address = await Address.findOne({ _id: addressId, userId: userId });
  if (!address) {
    return res.status(404).json({ success: false, message: "Address not found" });
  }

  let discount: any = null;
  if (cart.discountCode) {
    const foundDiscount = await Discount.findOne({
      code: cart.discountCode.trim().toUpperCase(),
      publish: true,
    }).lean();
    if (foundDiscount) {
      discount = {
        code: foundDiscount.code,
        labDiscount: foundDiscount.labDiscount || 0,
        diamondDiscount: foundDiscount.diamondDiscount || 0,
      };
    }
  }

  const itemsWithSnapshots = cart.items.map((item: any) => {
    const product = item.product as any;
    
    // Safety check for the "Cannot read properties of null (reading '_id')" error
    if (!product) {
      throw new Error("One or more products in your cart are no longer available.");
    }

    let image = null;
    const matchedVariation = product.variations.find(
      (v: any) => v.metal.toLowerCase() === item.metal.toLowerCase() && 
                  v.color.toLowerCase() === item.color.toLowerCase()
    );

    let metalAmt = 0, labourAmt = 0, diamondAmtTotal = 0, totalAmt = 0;
    let labDiscountAmt = 0, diamondDiscountAmt = 0, totalDiscountAmt = 0, finalAmt = 0;

    if (matchedVariation) {
      const matchedShape = matchedVariation.shapes.find(
        (s: any) => s.shape.toLowerCase() === item.shape.toLowerCase()
      );

      if (matchedShape) {
        image = matchedShape.images?.[0] || null;
        
        // FIND CARAT OBJ (Same logic as addToCart)
        const reqCaratNum = parseFloat(String(item.carat));
        let caratObj = matchedShape.carats.find((c: any) => {
          return parseFloat(String(c.carat)).toFixed(3) === reqCaratNum.toFixed(3);
        });

        // Fallback for Dynamic tiers (D16-D30)
        if (!caratObj) {
          caratObj = matchedShape.carats.find((c: any) =>
            c.diamondCategory?.some((cat: any) => DYNAMIC_DIAMOND_REGEX.test(String(cat).trim()))
          );
        }

        if (caratObj) {
          const qty = item.quantity || 1;
          const pricing = calculateDiamondPrice(caratObj, reqCaratNum);
          
          metalAmt = pricing.metalAmt * qty;
          labourAmt = pricing.labourAmt * qty;
          diamondAmtTotal = pricing.diamondAmtTotal * qty;
          totalAmt = pricing.unitTotal * qty; // This is the corrected price

          if (discount) {
            labDiscountAmt = (labourAmt * discount.labDiscount) / 100;
            diamondDiscountAmt = (diamondAmtTotal * discount.diamondDiscount) / 100;
          }

          totalDiscountAmt = labDiscountAmt + diamondDiscountAmt;
          finalAmt = totalAmt - totalDiscountAmt;
        }
      }
    }

    return {
      product: product._id,
      title: product.title,
      slug: product.slug,
      category: item.category || "Jewelry",
      image,
      metal: item.metal,
      color: item.color,
      designType: item.designType,
      style: item.style,
      stone: item.stone,
      shape: item.shape,
      carat: item.carat,
      size: item.size,
      quantity: item.quantity,
      price: Math.round(finalAmt),
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

  const subtotal = itemsWithSnapshots.reduce((acc, item) => acc + item.priceDetails.totalAmt, 0);
  const totalLabDiscount = itemsWithSnapshots.reduce((acc, item) => acc + item.priceDetails.labDiscountAmt, 0);
  const totalDiamondDiscount = itemsWithSnapshots.reduce((acc, item) => acc + item.priceDetails.diamondDiscountAmt, 0);
  const totalDiscount = totalLabDiscount + totalDiamondDiscount;
  const finalTotal = subtotal - totalDiscount;

  const order = await Order.create({
    user: userId,
    items: itemsWithSnapshots,
    address: {
      type: address.type,
      name: address.name,
      email: address.email,
      phone: address.phone,
      pincode: address.pincode,
      state: address.state,
      city: address.city,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      landmark: address.landmark,
    },
    discountInfo: discount,
    subtotal: Math.round(subtotal),
    totalLabDiscount: Math.round(totalLabDiscount),
    totalDiamondDiscount: Math.round(totalDiamondDiscount),
    totalDiscount: Math.round(totalDiscount),
    finalTotal: Math.round(finalTotal),
    paymentMethod: paymentMethod || "COD",
  });

  // Reset Cart
  cart.items = [];
  cart.discountCode = null;
  await cart.save();

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (req.query.orderStatus) filter.orderStatus = req.query.orderStatus;
  if (req.query.paymentMethod) filter.paymentMethod = req.query.paymentMethod;
  if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;

  if (req.query.today === "true") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    filter.createdAt = { $gte: start };
  }

  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const getOrderStats = asyncHandler(async (_req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const [
    today,
    processing,
    shipped,
    delivered,
    cancelled,
    cod,
    online,
    failedPayment,
  ] = await Promise.all([
    Order.countDocuments({ createdAt: { $gte: start } }),
    Order.countDocuments({ orderStatus: "processing" }),
    Order.countDocuments({ orderStatus: "shipped" }),
    Order.countDocuments({ orderStatus: "delivered" }),
    Order.countDocuments({ orderStatus: "cancelled" }),
    Order.countDocuments({ paymentMethod: "COD" }),
    Order.countDocuments({ paymentMethod: "ONLINE" }),
    Order.countDocuments({ paymentStatus: "failed" }),
  ]);

  res.json({
    success: true,
    data: {
      today,
      processing,
      shipped,
      delivered,
      cancelled,
      cod,
      online,
      failedPayment,
    },
  });
});


export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find({ user: _id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments({ user: _id }),
  ]);

  return res.status(200).json({
    success: true,
    message: "My orders fetched successfully",
    data: orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email mobile")
      .lean();

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  }
);

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order)
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });

  return res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order)
    return res.status(404).json({ success: false, message: "Order not found" });
  return res.status(200).json({ success: true, message: "Order deleted" });
});

export const deleteManyOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Order IDs provided",
      });

    const result = await Order.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Orders deleted successfully`,
    });
  }
);
