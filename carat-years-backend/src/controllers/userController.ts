import { Request, Response } from "express";
import { User } from "../models/User";
import { asyncHandler } from "../middlewares/asyncHandler";
import { generateOtpCode } from "../utils/generateOtp";
import sendEmail from "../utils/sendEmail";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import ExcelJS from "exceljs";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, mobile, password } = req.body;

    // Check if email already exists
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser && existingEmailUser.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already registered and verified. Please log in.",
      });
    }

    // Check if mobile already exists
    const existingMobileUser = await User.findOne({ mobile });
    if (existingMobileUser && existingMobileUser.mobileVerified) {
      return res.status(400).json({
        success: false,
        message:
          "Mobile number already registered and verified. Please log in.",
      });
    }

    let user;

    // If email exists but not verified, update that user
    if (existingEmailUser) {
      if (
        existingMobileUser &&
        existingMobileUser._id.toString() !== existingEmailUser._id.toString()
      ) {
        return res.status(400).json({
          success: false,
          message: "Mobile number already used by another account.",
        });
      }

      user = existingEmailUser;
      user.name = name;
      user.password = password;
      user.mobile = mobile;
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        mobile,
        password,
        emailVerified: false,
        mobileVerified: false,
      });
    }

    // Generate OTPs
    const emailOtp = generateOtpCode();
    // const mobileOtp = generateOtpCode(); // Uncomment when mobile service integrated
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.emailOtp = emailOtp;
    user.emailOtpExpiry = otpExpiry;
    // user.mobileOtp = mobileOtp;
    // user.mobileOtpExpiry = otpExpiry;

    await user.save();

    // Send Email OTP
    await sendEmail(
      user.email,
      "Carat Years - Verify Your Email",
      `
    <div style="font-family: Roboto, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://carat-years-backend.vual.in/uploads/logo.png" alt="Carat Years Logo" style="max-width: 150px;">
      </div>
      <h2 style="color: #430045; text-align: center;">Verify Your Email Address</h2>
      <p style="color: #555555; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
      <p style="color: #555555; font-size: 16px;">Thank you for registering with Carat Years. Please use the OTP below to verify your email address:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; color: #430045; letter-spacing: 4px; background-color: #e6f4f1; padding: 12px 20px; border-radius: 8px; display: inline-block;">
          ${emailOtp}
        </span>
      </div>
      <p style="color: #555555; font-size: 14px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
      <p style="color: #555555; font-size: 14px;">Thank you,<br>The Carat Years Team</p>
    </div>
    `
    );

    /* 
  // Send Mobile OTP (commented until integration)
  await sendSMS(user.mobile, `Your Carat Years OTP is: ${mobileOtp}`);
  */

    return res.status(200).json({
      success: true,
      message: "OTP sent to email. Please verify to complete registration.",
      data: { email: user.email, mobile: user.mobile },
    });
  }
);

export const verifyUserOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, emailOtp /*, mobileOtp */ } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.emailVerified /* && user.mobileVerified */)
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });

    const now = new Date();

    // Email OTP check
    if (
      !user.emailOtpExpiry ||
      user.emailOtp !== emailOtp ||
      now > user.emailOtpExpiry
    )
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired email OTP" });

    /* 
  // Mobile OTP check (temporarily commented)
  if (!user.mobileOtpExpiry || user.mobileOtp !== mobileOtp || now > user.mobileOtpExpiry)
    return res.status(400).json({ success: false, message: "Invalid or expired mobile OTP" });
  */

    user.emailVerified = true;
    /* user.mobileVerified = true; */ // Keep it commented for now

    user.emailOtp = undefined;
    user.emailOtpExpiry = undefined;

    /* 
  user.mobileOtp = undefined;
  user.mobileOtpExpiry = undefined;
  */

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! Mobile verification pending.",
    });
  }
);

export const resendEmailOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const emailOtp = generateOtpCode();
    user.emailOtp = emailOtp;
    user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    await sendEmail(
      user.email,
      "Carat Years - Verify Your Email",
      `
      <div style="font-family: Roboto, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://carat-years-backend.vual.in/uploads/logo.png" alt="Carat Years Logo" style="max-width: 150px;">
        </div>
        <h2 style="color: #430045; text-align: center;">Verify Your Email Address</h2>
        <p style="color: #555555; font-size: 16px;">
          Hi <strong>${user.name}</strong>,
        </p>
        <p style="color: #555555; font-size: 16px;">
          Here is your new OTP to verify your email address:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #430045; letter-spacing: 4px; background-color: #e6f4f1; padding: 12px 20px; border-radius: 8px; display: inline-block;">
            ${emailOtp}
          </span>
        </div>
        <p style="color: #555555; font-size: 14px;">
          This OTP is valid for 10 minutes. Do not share it with anyone.
        </p>
        <p style="color: #555555; font-size: 14px;">
          Thank you,<br>
          The Carat Years Team
        </p>
      </div>
      `
    );

    return res.status(200).json({
      success: true,
      message: "New email OTP sent successfully",
    });
  }
);

export const resendMobileOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const { mobile } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.mobileVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Mobile number already verified" });
    }

    // Generate new OTP
    const mobileOtp = generateOtpCode();
    user.mobileOtp = mobileOtp;
    user.mobileOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    // Send OTP via email (or SMS if you have SMS service)
    await sendEmail(
      user.email,
      "Carat Years - Verify Your Mobile",
      `
      <div style="font-family: Roboto, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://carat-years-backend.vual.in/uploads/logo.png" alt="Carat Years Logo" style="max-width: 150px;">
        </div>
        <h2 style="color: #430045; text-align: center;">Verify Your Mobile Number</h2>
        <p style="color: #555555; font-size: 16px;">
          Hi <strong>${user.name}</strong>,
        </p>
        <p style="color: #555555; font-size: 16px;">
          Here is your new OTP to verify your mobile number:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #430045; letter-spacing: 4px; background-color: #e6f4f1; padding: 12px 20px; border-radius: 8px; display: inline-block;">
            ${mobileOtp}
          </span>
        </div>
        <p style="color: #555555; font-size: 14px;">
          This OTP is valid for 10 minutes. Do not share it with anyone.
        </p>
        <p style="color: #555555; font-size: 14px;">
          Thank you,<br>
          The Carat Years Team
        </p>
      </div>
      `
    );

    return res.status(200).json({
      success: true,
      message: "New mobile OTP sent successfully",
    });
  }
);

export const loginWithPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, mobile, password } = req.body;

    if (!password || (!email && !mobile)) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile and password are required",
      });
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (mobile) {
      user = await User.findOne({ mobile });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        token: generateToken(user._id.toString(), user.role),
      },
    });
  }
);

export const sendEmailLoginOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOtpCode();

    user.emailOtp = otp;
    user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    await sendEmail(
      user.email,
      "Carat Years - Login OTP",
      `
      <div style="font-family: Roboto, sans-serif; max-width: 600px; margin: auto;">
        <h2>Your Login OTP</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing:4px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
      `
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  }
);

export const verifyEmailLoginOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user || !user.emailOtp || !user.emailOtpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const now = new Date();

    if (now > user.emailOtpExpiry || user.emailOtp !== otp) {
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // OTP success → clear fields
    user.emailOtp = undefined;
    user.emailOtpExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        token: generateToken(user._id.toString(), user.role),
      },
    });
  }
);

export const loginWithGoogle = asyncHandler(
  async (req: Request, res: Response) => {
    const { idToken } = req.body;

    if (!idToken) {
      return res
        .status(400)
        .json({ success: false, message: "ID Token is required" });
    }

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Google token" });
    }

    const { email, name, sub: googleId } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        role: "user",
      });
    }

    // Generate your own JWT
    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "No User found with that email",
      });

    const emailOtp = generateOtpCode();
    const emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    user.emailOtp = emailOtp;
    user.emailOtpExpiry = emailOtpExpiry;

    await user.save();
    await sendEmail(
      user.email,
      "Carat Years - Password Reset OTP",
      `<div style="font-family: Roboto, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://carat-years-backend.vual.in/uploads/logo.png" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
    </div>
    <h2 style="color: #430045; text-align: center;">Reset Your Password</h2>
    <p style="color: #555555;">Hi <strong>${user.name}</strong>,</p>
    <p style="color: #555555;">
      We received a request to reset the password for your Carat Years account.
      Use the OTP below to proceed with resetting your password:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <p style="font-size: 24px; font-weight: bold; color: #430045; letter-spacing: 4px; background-color: #e6f4f1; padding: 12px 20px; display: inline-block; border-radius: 8px;">${emailOtp}</p>
    </div>
    <p style="color: #555555;">This OTP is valid for 10 minutes. Do not share this code with anyone.</p>
    <p style="color: #555555;">If you didn’t request a password reset, please ignore this email. Your account is safe.</p>
    <p style="color: #555555;">Thank you,<br>The Carat Years Team</p>
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
    <p style="font-size: 12px; color: #999999; text-align: center;">
      &copy; 2025 Carat Years. All rights reserved.
    </p>
  </div>
`
    );

    return res.status(200).json({
      success: true,
      message: "Reset password OTP sent to your email",
    });
  }
);

export const verifyEmailOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, emailOtp } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const now = new Date();

    if (
      !user.emailOtpExpiry ||
      user.emailOtp !== emailOtp ||
      now > user.emailOtpExpiry
    )
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired email OTP" });

    user.emailOtp = undefined;
    user.emailOtpExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      data: { email: email },
      message: "Email verified successfully",
    });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.password = password;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString(), user.role),
      },
    });
  }
);

export const profile = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id).lean();
  if (!user) {
    return res.status(404).json({
      success: false,
      mesagge: "User not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
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

    const user = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user,
    });
  }
);

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Soft delete instead of permanent delete
    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Your account has been scheduled for deletion. It will be permanently deleted after 30 days.",
    });
  }
);

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  return res.status(200).json({
    success: true,
    message: "Fetched User successfully",
    data: user,
  });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(),
  ]);

  return res.status(200).json({
    success: true,
    message: "Fetched User successfully",
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const updateUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const updateData = { ...req.body };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  }
);

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const deleteManyUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No User IDs provided",
      });

    const result = await User.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Users deleted successfully`,
    });
  }
);

export const downloadUsersExcel = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find().sort({ createdAt: -1 }).lean();

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Users");

    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Mobile", key: "mobile", width: 20 },
      { header: "Role", key: "role", width: 15 },
      { header: "Email Verified", key: "emailVerified", width: 18 },
      { header: "Mobile Verified", key: "mobileVerified", width: 18 },
      { header: "Deleted", key: "isDeleted", width: 12 },
      { header: "Deleted At", key: "deletedAt", width: 25 },
      { header: "Account Created On", key: "createdAt", width: 25 },
      { header: "Last Updated On", key: "updatedAt", width: 25 },
    ];

    users.forEach((user) => {
      sheet.addRow({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        emailVerified: user.emailVerified ? "Yes" : "No",
        mobileVerified: user.mobileVerified ? "Yes" : "No",
        isDeleted: user.isDeleted ? "Yes" : "No",
        deletedAt: user.deletedAt
          ? new Date(user.deletedAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "-",
        createdAt: new Date(user.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        updatedAt: new Date(user.updatedAt).toLocaleString("en-IN", {
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
    res.setHeader("Content-Disposition", 'attachment; filename="users.xlsx"');

    // Stream workbook directly to response — triggers auto download
    await workbook.xlsx.write(res);
    res.end();
  }
);
