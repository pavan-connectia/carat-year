import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Wishlist } from "../models/Wishlist";

export const addToWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    const wishlistItem = await Wishlist.create({
      ...req.body,
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "Added to wishlist",
      data: wishlistItem,
    });
  }
);

export const removeFromWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    const deleted = await Wishlist.findOneAndDelete({
      userId,
      _id: req.params.id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist item not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      data: deleted,
    });
  }
);

export const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const wishlist = await Wishlist.find({ userId })
    .populate("category", "title slug")
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    message: "Wishlist fetched successfully",
    data: wishlist,
  });
});
