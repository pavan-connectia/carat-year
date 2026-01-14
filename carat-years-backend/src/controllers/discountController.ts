import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Discount } from "../models/Discount";

export const createDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const discount = await Discount.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Discount created successfully",
      data: discount,
    });
  }
);

export const getAllDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const filter: Record<string, any> = {};

    if (req.query.publish === "true") {
      filter.publish = true;
    } else if (req.query.publish === "false") {
      filter.publish = false;
    }

    const discount = await Discount.find(filter)
      .sort({ order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Discount fetched successfully",
      data: discount,
    });
  }
);

export const getDiscountById = asyncHandler(
  async (req: Request, res: Response) => {
    const discount = await Discount.findById(req.params.id).lean();

    if (!discount)
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });

    return res.status(200).json({
      success: true,
      message: "Discount fetched successfully",
      data: discount,
    });
  }
);

export const updateDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const discountId = req.params.id;
    const newOrder = req.body.order;

    const discount = await Discount.findById(discountId);
    if (!discount)
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });

    const oldOrder = discount.order;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      if (newOrder > oldOrder) {
        // Shift others up (move down visually)
        await Discount.updateMany(
          {
            order: { $gt: oldOrder, $lte: newOrder },
            _id: { $ne: discountId },
          },
          { $inc: { order: -1 } }
        );
      } else {
        // Shift others down (move up visually)
        await Discount.updateMany(
          {
            order: { $gte: newOrder, $lt: oldOrder },
            _id: { $ne: discountId },
          },
          { $inc: { order: 1 } }
        );
      }
    }

    // Update the current discount
    const updatedDiscount = await Discount.findByIdAndUpdate(
      discountId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Discount updated successfully",
      data: updatedDiscount,
    });
  }
);

export const deleteDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const discount = await Discount.findByIdAndDelete(req.params.id);

    if (!discount)
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });

    return res.status(200).json({
      success: true,
      message: "Discount deleted successfully",
    });
  }
);

export const deleteManyDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Discount IDs provided",
      });

    const result = await Discount.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Discounts deleted successfully`,
    });
  }
);

// controllers/discountController.ts
export const previewDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    // controller/discountPreview.ts (concept)
    const { code, priceDetails } = req.body;

    let discount;

    // AUTO mode → pick best published coupon
    if (code === "AUTO") {
      discount = await Discount.findOne({ publish: true })
        .sort({
          // priority logic
          labDiscount: -1,
          diamondDiscount: -1,
          order: 1,
        });
    } else {
      discount = await Discount.findOne({
        code: code.trim().toUpperCase(),
        publish: true,
      });
    }

    if (!discount) {
      return res.status(200).json({
        success: true,
        data: {
          originalPrice: priceDetails.totalAmt,
          finalPrice: priceDetails.totalAmt,
          totalDiscount: 0,
          appliedCode: null,
        },
      });
    }

    // calculate discount
    const labDiscountAmt =
      (priceDetails.labourAmt * discount.labDiscount) / 100;

    const diamondDiscountAmt =
      (priceDetails.diamondAmtTotal * discount.diamondDiscount) / 100;

    const totalDiscount = labDiscountAmt + diamondDiscountAmt;

    return res.json({
      success: true,
      data: {
        appliedCode: discount.code,
        originalPrice: priceDetails.totalAmt,
        totalDiscount,
        finalPrice: priceDetails.totalAmt - totalDiscount,
      },
    });

  }
);

