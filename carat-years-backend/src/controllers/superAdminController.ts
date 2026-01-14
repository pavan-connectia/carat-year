import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { SuperAdmin } from "../models/SuperAdmin";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcryptjs";
import { generateOtpCode } from "../utils/generateOtp";
import sendEmail from "../utils/sendEmail";

export const registerSuperAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password,role } = req.body;
    const superAdminExists = await SuperAdmin.findOne({ email });

    if (superAdminExists)
      return res
        .status(400)
        .json({ success: false, message: "SuperAdmin already exists" });

    const superAdmin = await SuperAdmin.create({ name, email, password,role });

    return res.status(201).json({
      success: true,
      data: {
        _id: superAdmin._id.toString(),
        name: superAdmin.name,
        email: superAdmin.email,
        role: superAdmin.role,
        token: generateToken(superAdmin._id.toString(), superAdmin.role),
      },
    });
  }
);

export const loginSuperAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const superAdmin = await SuperAdmin.findOne({ email });
    if (superAdmin && (await superAdmin.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: {
          _id: superAdmin._id,
          name: superAdmin.name,
          email: superAdmin.email,
          role: superAdmin.role,
          token: generateToken(superAdmin._id.toString(), superAdmin.role),
        },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const superAdmin = await SuperAdmin.findOne({ email });

    const otp = generateOtpCode();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    superAdmin.otp = otp;
    superAdmin.otpExpiry = otpExpiry;

    if (!superAdmin) {
      return res.status(404).json({
        success: false,
        message: "No SuperAdmin found with that email",
      });
    }

    await superAdmin.save();

    await sendEmail(
      superAdmin.email,
      "Carat Years - Password Reset OTP",
      `<div style="font-family: Roboto, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://carat-years-backend.vual.in/uploads/logo.png" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
    </div>
    <h2 style="color: #430045; text-align: center;">Reset Your Password</h2>
    <p style="color: #555555;">Hi <strong>${superAdmin.name}}</strong>,</p>
    <p style="color: #555555;">
      We received a request to reset the password for your Carat Years account.
      Use the OTP below to proceed with resetting your password:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <p style="font-size: 24px; font-weight: bold; color: #430045; letter-spacing: 4px; background-color: #e6f4f1; padding: 12px 20px; display: inline-block; border-radius: 8px;">${otp}</p>
    </div>
    <p style="color: #555555;">This OTP is valid for 10 minutes. Do not share this code with anyone.</p>
    <p style="color: #555555;">If you didn’t request a password reset, please ignore this email. Your account is safe.</p>
    <p style="color: #555555;">Thank you,<br>The Carat Years Team</p>
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
    <p style="font-size: 12px; color: #999999; text-align: center;">
      &copy; 2025 Carat Years. All rights reserved.
    </p>
  </div>`
    );

    return res.status(200).json({
      suceess: true,
      message: "Reset password OTP sent to your email",
    });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { otp, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ otp });

    if (
      !superAdmin ||
      !superAdmin.otpExpiry ||
      superAdmin.otpExpiry < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    superAdmin.password = password;
    superAdmin.otp = undefined;
    superAdmin.otpExpiry = undefined;

    await superAdmin.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: {
        _id: superAdmin._id,
        name: superAdmin.name,
        email: superAdmin.email,
        role: superAdmin.role,
        token: generateToken(superAdmin._id.toString(), superAdmin.role),
      },
    });
  }
);

export const profile = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const superAdmin = await SuperAdmin.findById(_id).lean();
  if (!superAdmin) {
    return res.status(404).json({
      success: false,
      mesagge: "Super admin not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Super admin profile fetched successfully",
      data: superAdmin,
    });
  }
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user;

    const updateData = { ...req.body };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const superAdmin = await SuperAdmin.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!superAdmin)
      return res.status(404).json({
        success: false,
        message: "Super admin not found",
      });

    return res.status(200).json({
      success: true,
      message: "Super admin profile updated successfully",
      data: superAdmin,
    });
  }
);

export const getSuperAdminById = asyncHandler(
  async (req: Request, res: Response) => {
    const superAdmin = await SuperAdmin.findById(req.params.id);

    if (!superAdmin)
      return res.status(404).json({
        success: false,
        message: "Super admin not found",
      });

    return res.status(200).json({
      success: true,
      message: "Fetched super admin successfully",
      data: superAdmin,
    });
  }
);

export const getSuperAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const superAdmin = await SuperAdmin.find();

    if (!superAdmin)
      return res.status(404).json({
        success: false,
        message: "Super admin not found",
      });

    return res.status(200).json({
      success: true,
      message: "Fetched super admin successfully",
      data: superAdmin,
    });
  }
);

export const updateSuperAdminById = asyncHandler(
  async (req: Request, res: Response) => {
    const updateData = { ...req.body };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const superAdmin = await SuperAdmin.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!superAdmin)
      return res.status(404).json({
        success: false,
        message: "Super admin not found",
      });

    return res.status(200).json({
      success: true,
      message: "Super admin updated successfully",
      data: superAdmin,
    });
  }
);

export const deleteSuperAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const superAdmin = await SuperAdmin.findByIdAndDelete(req.params.id);

    if (!superAdmin)
      return res.status(404).json({
        success: false,
        message: "Super admin not found",
      });

    return res.status(200).json({
      success: true,
      message: "Super admin deleted successfully",
    });
  }
);

export const deleteManySuperAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Super admin IDs provided",
      });

    const result = await SuperAdmin.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Super admins deleted successfully`,
    });
  }
);
