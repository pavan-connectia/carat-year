import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: "User";
  emailVerified: boolean;
  mobileVerified: boolean;
  emailOtp: String;
  emailOtpExpiry: Date;
  mobileOtp: String;
  mobileOtpExpiry: Date;
  deletedAt: Date;
  isDeleted: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Name can't be empty"] },
    email: {
      type: String,
      required: [true, "Email can't be empty"],
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile can't be empty"],
      unique: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password can't be empty"] },
    role: { type: String, required: true, default: "User" },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    mobileVerified: {
      type: Boolean,
      default: false,
    },
    emailOtp: String,
    emailOtpExpiry: Date,
    mobileOtp: String,
    mobileOtpExpiry: Date,
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.emailOtp;
    delete ret.emailOtpExpiry;
    delete ret.mobileOtp;
    delete ret.mobileOtpExpiry;
    return ret;
  },
});

userSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.emailOtp;
    delete ret.emailOtpExpiry;
    delete ret.mobileOtp;
    delete ret.mobileOtpExpiry;
    return ret;
  },
});

export const User = model<IUser>("User", userSchema);
