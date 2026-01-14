import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Faq } from "../models/Faq";

export const createFaq = asyncHandler(async (req: Request, res: Response) => {
  const faq = await Faq.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Faq created successfully",
    data: faq,
  });
});

export const getAllFaq = asyncHandler(async (req: Request, res: Response) => {
  const filter: Record<string, any> = {};

  if (req.query.publish === "true") {
    filter.publish = true;
  } else if (req.query.publish === "false") {
    filter.publish = false;
  }

  const faq = await Faq.find(filter).sort({ order: 1 }).lean();

  return res.status(200).json({
    success: true,
    message: "Faq fetched successfully",
    data: faq,
  });
});

export const getFaqById = asyncHandler(async (req: Request, res: Response) => {
  const faq = await Faq.findById(req.params.id).lean();

  if (!faq)
    return res.status(404).json({
      success: false,
      message: "Faq not found",
    });

  return res.status(200).json({
    success: true,
    message: "Faq fetched successfully",
    data: faq,
  });
});

export const updateFaq = asyncHandler(async (req: Request, res: Response) => {
  const faqId = req.params.id;
  const newOrder = req.body.order;

  const faq = await Faq.findById(faqId);
  if (!faq)
    return res.status(404).json({
      success: false,
      message: "Faq not found",
    });

  const oldOrder = faq.order;

  if (newOrder !== undefined && newOrder !== oldOrder) {
    if (newOrder > oldOrder) {
      // Shift others up (move down visually)
      await Faq.updateMany(
        {
          order: { $gt: oldOrder, $lte: newOrder },
          _id: { $ne: faqId },
        },
        { $inc: { order: -1 } }
      );
    } else {
      // Shift others down (move up visually)
      await Faq.updateMany(
        {
          order: { $gte: newOrder, $lt: oldOrder },
          _id: { $ne: faqId },
        },
        { $inc: { order: 1 } }
      );
    }
  }

  // Update the current faq
  const updatedFaq = await Faq.findByIdAndUpdate(faqId, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: "Faq updated successfully",
    data: updatedFaq,
  });
});

export const deleteFaq = asyncHandler(async (req: Request, res: Response) => {
  const faq = await Faq.findByIdAndDelete(req.params.id);

  if (!faq)
    return res.status(404).json({
      success: false,
      message: "Faq not found",
    });

  return res.status(200).json({
    success: true,
    message: "Faq deleted successfully",
  });
});

export const deleteManyFaq = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No FAQ IDs provided",
      });

    const result = await Faq.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} FAQs deleted successfully`,
    });
  }
);
