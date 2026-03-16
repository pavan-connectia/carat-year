import { Request, Response } from "express";
import { asyncHandler } from "middlewares/asyncHandler";
import { Home } from "models/Home";

export const getHome = asyncHandler(
  async (req: Request, res: Response) => {

    const home = await Home.findOne();

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Home data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Home fetched successfully",
      data: home,
    });
  }
);

export const UpdateHome = asyncHandler(
  async (req: Request, res: Response) => {

    const updatedHome = await Home.findOneAndUpdate(
      {},
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHome) {
      return res.status(404).json({
        success: false,
        message: "Home not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Home updated successfully",
      data: updatedHome,
    });
  }
);