import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Rate } from "../models/Rate";
import { recalculateAllProductPrices } from "../utils/recalculateProductPrices";

export const createRate = asyncHandler(async (req: Request, res: Response) => {
  const rate = await Rate.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Rate created successfully",
    data: rate,
  });
});

export const getRate = asyncHandler(async (req: Request, res: Response) => {
  const rate = await Rate.findOne().lean();

  return res.status(200).json({
    success: true,
    message: "Rate fetched successfully",
    data: rate,
  });
});

export const updateRates = asyncHandler(async (req: Request, res: Response) => {
  const { metal, diamond, labour } = req.body;

  const updated = await Rate.findOneAndUpdate(
    {},
    {
      $set: { metal, diamond, labour, lastUpdated: new Date() },
    },
    { new: true, upsert: true }
  );

  await recalculateAllProductPrices();

  res.status(200).json({
    success: true,
    message: "Rates updated successfully",
    data: updated,
  });
});
