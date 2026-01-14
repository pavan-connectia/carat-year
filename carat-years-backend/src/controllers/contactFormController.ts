import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ContactForm } from "../models/ContactForm";

export const createContactForm = asyncHandler(
  async (req: Request, res: Response) => {
    const contactForm = await ContactForm.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Contact form form submitted successfully",
      data: contactForm,
    });
  }
);

export const getAllContactForm = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * limit;

    const [contactForms, total] = await Promise.all([
      ContactForm.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactForm.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Contact form fetched successfully",
      data: contactForms,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);

export const getContactFormById = asyncHandler(
  async (req: Request, res: Response) => {
    const contactForm = await ContactForm.findById(req.params.id).lean();

    if (!contactForm)
      return res.status(404).json({
        success: false,
        message: "Contact form not found",
      });

    return res.status(200).json({
      success: true,
      message: "Contact form fetched successfully",
      data: contactForm,
    });
  }
);

export const updateContactForm = asyncHandler(
  async (req: Request, res: Response) => {
    const contactForm = await ContactForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contactForm)
      return res.status(404).json({
        success: false,
        message: "Contact form not found",
      });

    return res.status(200).json({
      success: true,
      message: "Contact form updated successfully",
      data: contactForm,
    });
  }
);

export const deleteContactForm = asyncHandler(
  async (req: Request, res: Response) => {
    const contactForm = await ContactForm.findByIdAndDelete(req.params.id);

    if (!contactForm)
      return res.status(404).json({
        success: false,
        message: "Contact form not found",
      });

    return res.status(200).json({
      success: true,
      message: "Contact form deleted successfully",
    });
  }
);

export const deleteManyContactForm = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Contact Form IDs provided",
      });

    const result = await ContactForm.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Contact Forms deleted successfully`,
    });
  }
);
