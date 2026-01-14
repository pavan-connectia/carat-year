import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { User } from "../models/User";
import { SuperAdmin } from "../models/SuperAdmin";

export const protect = asyncHandler(
  async (req: any, res: any, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    let user;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (decoded.role === "User")
      user = await User.findById(decoded._id).select("-password");
    else user = await SuperAdmin.findById(decoded._id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  }
);
