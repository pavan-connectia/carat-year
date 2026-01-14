import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ProductCategory } from "../models/ProductCategory";

export const createProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const productCategory = await ProductCategory.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Product category created successfully",
      data: productCategory,
    });
  }
);

export const getAllProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const productCategorys = await ProductCategory.find()
      .sort({ order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Product category fetched successfully",
      data: productCategorys,
    });
  }
);

export const getProductCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const productCategory = await ProductCategory.findById(
      req.params.id
    ).lean();

    if (!productCategory)
      return res.status(404).json({
        success: false,
        message: "Product category not found",
      });

    return res.status(200).json({
      success: true,
      message: "Product category fetched successfully",
      data: productCategory,
    });
  }
);

export const updateProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const productCategoryId = req.params.id;
    const newOrder = req.body.order;

    const product = await ProductCategory.findById(productCategoryId);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product category not found",
      });

    const oldOrder = product.order;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      if (newOrder > oldOrder) {
        // Shift others up (move down visually)
        await ProductCategory.updateMany(
          {
            order: { $gt: oldOrder, $lte: newOrder },
            _id: { $ne: productCategoryId },
          },
          { $inc: { order: -1 } }
        );
      } else {
        // Shift others down (move up visually)
        await ProductCategory.updateMany(
          {
            order: { $gte: newOrder, $lt: oldOrder },
            _id: { $ne: productCategoryId },
          },
          { $inc: { order: 1 } }
        );
      }
    }

    // Update the current product
    const updatedProduct = await ProductCategory.findByIdAndUpdate(
      productCategoryId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  }
);

export const deleteProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const productCategory = await ProductCategory.findByIdAndDelete(
      req.params.id
    );

    if (!productCategory)
      return res.status(404).json({
        success: false,
        message: "Product category not found",
      });

    return res.status(200).json({
      success: true,
      message: "Product category deleted successfully",
    });
  }
);

export const deleteManyProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Product category IDs provided",
      });

    const result = await ProductCategory.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Product categorys deleted successfully`,
    });
  }
);
