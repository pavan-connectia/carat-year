import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Testimonials } from "../models/Testimonials";

export const createTestimonials = asyncHandler(
  async (req: Request, res: Response) => {
    const testimonials = await Testimonials.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Testimonials created successfully",
      data: testimonials,
    });
  }
);

export const getAllTestimonials = asyncHandler(
  async (req: Request, res: Response) => {
    const filter: Record<string, any> = {};

    if (req.query.publish === "true") {
      filter.publish = true;
    } else if (req.query.publish === "false") {
      filter.publish = false;
    }

    const testimonials = await Testimonials.find(filter)
      .sort({ order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: testimonials,
    });
  }
);

export const getTestimonialsById = asyncHandler(
  async (req: Request, res: Response) => {
    const testimonials = await Testimonials.findById(req.params.id).lean();

    if (!testimonials)
      return res.status(404).json({
        success: false,
        message: "Testimonials not found",
      });

    return res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: testimonials,
    });
  }
);

export const updateTestimonials = asyncHandler(
  async (req: Request, res: Response) => {
    const testimonialId = req.params.id;
    const newOrder = req.body.order;

    const testimonial = await Testimonials.findById(testimonialId);
    if (!testimonial)
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });

    const oldOrder = testimonial.order;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      if (newOrder > oldOrder) {
        // Shift others up (move down visually)
        await Testimonials.updateMany(
          {
            order: { $gt: oldOrder, $lte: newOrder },
            _id: { $ne: testimonialId },
          },
          { $inc: { order: -1 } }
        );
      } else {
        // Shift others down (move up visually)
        await Testimonials.updateMany(
          {
            order: { $gte: newOrder, $lt: oldOrder },
            _id: { $ne: testimonialId },
          },
          { $inc: { order: 1 } }
        );
      }
    }

    // Update the current testimonial
    const updatedTestimonial = await Testimonials.findByIdAndUpdate(
      testimonialId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  }
);

export const deleteTestimonials = asyncHandler(
  async (req: Request, res: Response) => {
    const testimonials = await Testimonials.findByIdAndDelete(req.params.id);

    if (!testimonials)
      return res.status(404).json({
        success: false,
        message: "Testimonials not found",
      });

    return res.status(200).json({
      success: true,
      message: "Testimonials deleted successfully",
    });
  }
);

export const deleteManyTestimonials = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Testimonials IDs provided",
      });

    const result = await Testimonials.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Testimonialss deleted successfully`,
    });
  }
);
