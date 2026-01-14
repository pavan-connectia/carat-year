import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Address } from "../models/Address";

export const createAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const data = req.body;

    const existingAddresses = await Address.countDocuments({ userId });

    if (existingAddresses === 0) {
      data.isDefault = true;
    }

    if (data.isDefault) {
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const address = await Address.create({ ...data, userId });

    return res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  }
);

export const getAddresses = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user;
    const address = await Address.find({ userId: _id })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "User address fetched successfully",
      data: address,
    });
  }
);

export const getAddressById = asyncHandler(
  async (req: Request, res: Response) => {
    const address = await Address.findById(req.params.id).lean();

    if (!address)
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });

    return res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: address,
    });
  }
);

export const updateAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id } = req.params;
    const data = req.body;

    const existingAddress = await Address.findOne({ _id: id, userId });
    if (!existingAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    if (data.isDefault === true) {
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const address = await Address.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  }
);

export const deleteAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const address = await Address.findByIdAndDelete(req.params.id);

    if (!address)
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  }
);
