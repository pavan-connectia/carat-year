import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { NewsletterSub } from "../models/NewsletterSub";
import ExcelJS from "exceljs";

export const createNewsletterSub = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, name } = req.body;

    const existingSub = await NewsletterSub.findOne({ email }).lean();

    if (existingSub)
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed to the newsletter.",
      });

    const subscription = await NewsletterSub.create({ email, name });

    return res.status(201).json({
      success: true,
      message: "Newsletter subscription created successfully",
      data: subscription,
    });
  }
);

export const getAllNewsletterSub = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * limit;

    const [subscriptions, total] = await Promise.all([
      NewsletterSub.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      NewsletterSub.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Newsletter subscription fetched successfully",
      data: subscriptions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);

export const getNewsletterSubById = asyncHandler(
  async (req: Request, res: Response) => {
    const subscription = await NewsletterSub.findById(req.params.id).lean();

    if (!subscription)
      return res.status(404).json({
        success: false,
        message: "Newsletter subscription not found",
      });

    return res.status(200).json({
      success: true,
      message: "Newsletter subscription fetched successfully",
      data: subscription,
    });
  }
);

export const updateNewsletterSub = asyncHandler(
  async (req: Request, res: Response) => {
    const subscription = await NewsletterSub.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subscription)
      return res.status(404).json({
        success: false,
        message: "Newsletter subscription not found",
      });

    return res.status(200).json({
      success: true,
      message: "Newsletter subscription updated successfully",
      data: subscription,
    });
  }
);

export const deleteNewsletterSub = asyncHandler(
  async (req: Request, res: Response) => {
    const subscription = await NewsletterSub.findByIdAndDelete(req.params.id);

    if (!subscription)
      return res.status(404).json({
        success: false,
        message: "Newsletter subscription not found",
      });

    return res.status(200).json({
      success: true,
      message: "Newsletter subscription deleted successfully",
    });
  }
);

export const deleteManyNewsletterSub = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Newsletter Sub IDs provided",
      });

    const result = await NewsletterSub.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Newsletter Subs deleted successfully`,
    });
  }
);

export const unsubscribeNewsletterSub = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.user;

    const existingSub = await NewsletterSub.findOneAndDelete({ email });

    if (!existingSub) {
      return res.status(404).json({
        success: false,
        message: "No newsletter subscription found for this email.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Newsletter unsubscribed successfully",
      data: existingSub,
    });
  }
);

export const downloadNewsletterSubsExcel = asyncHandler(
  async (req: Request, res: Response) => {
    const subscribers = await NewsletterSub.find()
      .sort({ createdAt: -1 })
      .lean();

    if (!subscribers.length) {
      return res.status(404).json({
        success: false,
        message: "No newsletter subscriptions found",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Subscribers");

    sheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 40 },
      { header: "Subscribed On", key: "createdAt", width: 25 },
    ];

    subscribers.forEach((sub) => {
      sheet.addRow({
        name: sub.name,
        email: sub.email,
        createdAt: new Date(sub.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      });
    });

    // Set response headers for browser download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="newsletter_subscribers.xlsx"'
    );

    // Stream workbook directly to response — triggers auto download
    await workbook.xlsx.write(res);
    res.end();
  }
);
