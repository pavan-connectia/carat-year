import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { Address } from "../models/Address";
import { Discount } from "../models/Discount";
import { Order } from "../models/Order";
import { asyncHandler } from "../middlewares/asyncHandler";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { addressId, paymentMethod } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    model: Product,
    select: "title slug category variations",
    populate: {
      path: "category",
      select: "title slug",
    },
  });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const address = await Address.findOne({ _id: addressId, userId: userId });
  
  if (!address) {
    return res
      .status(404)
      .json({ success: false, message: "Address not found" });
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
    } else {
      cart.discountCode = null;
      await cart.save();
    }
  }

  const itemsWithSnapshots = cart.items.map((item: any) => {
    const product = item.product as any;
    let image = null;

    const matchedVariation = product.variations.find(
      (v: any) => v.metal === item.metal && v.color === item.color
    );

    let matchedShape, matchedCarat;
    let metalAmt = 0,
      labourAmt = 0,
      diamondAmtTotal = 0,
      totalAmt = 0,
      labDiscountAmt = 0,
      diamondDiscountAmt = 0,
      totalDiscountAmt = 0,
      finalAmt = 0;

    if (matchedVariation) {
      matchedShape = matchedVariation.shapes.find(
        (s: any) => s.shape === item.shape
      );

      if (matchedShape) {
        image = matchedShape.images?.[0] || null;
        matchedCarat = matchedShape.carats.find(
          (c: any) => c.carat === item.carat
        );

        if (matchedCarat) {
          const qty = item.quantity || 1;
          metalAmt = matchedCarat.metalAmt * qty;
          labourAmt = matchedCarat.labourAmt * qty;
          diamondAmtTotal =
            matchedCarat.diamondAmt.reduce(
              (acc: number, val: number) => acc + val,
              0
            ) * qty;
          totalAmt = matchedCarat.totalAmt * qty;

          if (discount) {
            labDiscountAmt = (labourAmt * discount.labDiscount) / 100;
            diamondDiscountAmt =
              (diamondAmtTotal * discount.diamondDiscount) / 100;
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
      category: product.category?.title || null,
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
      price: finalAmt,
      priceDetails: {
        metalAmt,
        labourAmt,
        diamondAmtTotal,
        totalAmt,
        labDiscountAmt,
        diamondDiscountAmt,
        totalDiscountAmt,
        finalAmt,
      },
    };
  });

  const subtotal = itemsWithSnapshots.reduce(
    (acc, item) => acc + (item.priceDetails?.totalAmt ?? 0),
    0
  );
  const totalLabDiscount = itemsWithSnapshots.reduce(
    (acc, item) => acc + (item.priceDetails?.labDiscountAmt ?? 0),
    0
  );
  const totalDiamondDiscount = itemsWithSnapshots.reduce(
    (acc, item) => acc + (item.priceDetails?.diamondDiscountAmt ?? 0),
    0
  );
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
      isDefault: address.isDefault,
    },
    discountInfo: discount,
    subtotal,
    totalLabDiscount,
    totalDiamondDiscount,
    totalDiscount,
    finalTotal,
    paymentMethod: paymentMethod || "COD",
  });

  cart.items = [];
  cart.subtotal = 0;
  cart.total = 0;
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
