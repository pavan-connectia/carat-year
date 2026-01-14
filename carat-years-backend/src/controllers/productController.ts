import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Product } from "../models/Product";
import jwt from "jsonwebtoken";
import { Wishlist } from "../models/Wishlist";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    return res
      .status(201)
      .json({ success: true, message: "Product created", data: product });
  }
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const filter: Record<string, any> = {};
    if (req.query.publish === "true") filter.publish = true;
    else if (req.query.publish === "false") filter.publish = false;

    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ order: 1 })
        .populate("category", "title slug")
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    let userId: string | null = null;

    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      userId = decoded._id;
    }

    let wishlistedIds = new Set<string>();
    if (userId) {
      const wishlist = await Wishlist.find({ userId }).lean();
      wishlist.forEach((w) => wishlistedIds.add(w.slug)); // using slug as unique identifier
    }

    const simplifiedProducts = products.map((product) => {
      const uniqueColors = new Map<string, any>();

      for (const variation of product.variations || []) {
        const colorKey = variation.color?.toLowerCase();

        if (!uniqueColors.has(colorKey)) {
          const firstShape = variation.shapes?.[0];

          const firstCarat =
            firstShape?.carats && firstShape.carats.length > 0
              ? {
                ...firstShape.carats[0],
              }
              : null;

          const simplifiedShape = firstShape
            ? {
              shape: firstShape.shape,
              images: firstShape.images?.slice(0, 1) || [],
              carats: firstCarat ? [firstCarat] : [],
            }
            : null;

          uniqueColors.set(colorKey, {
            metal: variation.metal,
            color: variation.color,
            shapes: simplifiedShape ? [simplifiedShape] : [],
          });
        }
      }

      return {
        ...product,
        variations: Array.from(uniqueColors.values()),
        isWishlisted: userId ? wishlistedIds.has(product.slug) : false,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Products fetched",
      data: simplifiedProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findOne({
      slug: req.params.slug,
      publish: true,
    })
      .populate("category", "title slug")
      .lean();

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let userId: string | null = null;
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      userId = decoded._id;
    }

    let isWishlisted = false;
    if (userId) {
      const wishlistItem = await Wishlist.findOne({
        userId,
        slug: product.slug, // or product._id if using ObjectId
      });
      isWishlisted = !!wishlistItem;
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched",
      data: { ...product, isWishlisted },
    });
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const newOrder = req.body.order;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    const oldOrder = product.order;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      if (newOrder > oldOrder) {
        await Product.updateMany(
          {
            order: { $gt: oldOrder, $lte: newOrder },
            _id: { $ne: productId },
          },
          { $inc: { order: -1 } }
        );
      } else {
        await Product.updateMany(
          {
            order: { $gte: newOrder, $lt: oldOrder },
            _id: { $ne: productId },
          },
          { $inc: { order: 1 } }
        );
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
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

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.status(200).json({ success: true, message: "Product deleted" });
  }
);

export const deleteManyProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({
        success: false,
        message: "No Product IDs provided",
      });

    const result = await Product.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} Products deleted successfully`,
    });
  }
);

export const getProductByTag = asyncHandler(
  async (req: Request, res: Response) => {
    const { tag } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const normalizedTag = tag?.toLowerCase() || "all";

    const filter: any = { publish: true };
    if (normalizedTag !== "all") {
      filter.tags = { $regex: new RegExp(`^${normalizedTag}$`, "i") }; // case-insensitive exact match
    }

    const products = await Product.find(filter)
      .sort({ order: 1 })
      .populate("category", "title slug")
      .limit(limit)
      .lean();

    let userId: string | null = null;
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        userId = decoded._id;
      } catch (err) {
        userId = null;
      }
    }

    let wishlistedIds = new Set<string>();
    if (userId) {
      const wishlist = await Wishlist.find({ userId }).lean();
      wishlist.forEach((w) => wishlistedIds.add(w.slug));
    }

    const simplifiedProducts = products.map((product) => {
      const uniqueColors = new Map<string, any>();

      for (const variation of product.variations || []) {
        const colorKey = variation.color?.toLowerCase();
        if (!uniqueColors.has(colorKey)) {
          const firstShape = variation.shapes?.[0];
          const firstCarat =
            firstShape?.carats?.length > 0 ? { ...firstShape.carats[0] } : null;

          const simplifiedShape = firstShape
            ? {
              shape: firstShape.shape,
              images: firstShape.images?.slice(0, 1) || [],
              carats: firstCarat ? [firstCarat] : [],
            }
            : null;

          uniqueColors.set(colorKey, {
            metal: variation.metal,
            color: variation.color,
            shapes: simplifiedShape ? [simplifiedShape] : [],
          });
        }
      }

      return {
        ...product,
        variations: Array.from(uniqueColors.values()),
        isWishlisted: userId ? wishlistedIds.has(product.slug) : false,
      };
    });

    return res.status(200).json({
      success: true,
      message:
        tag?.toLowerCase() === "all"
          ? "All products fetched successfully"
          : `Products fetched for tag: ${tag}`,
      data: simplifiedProducts,
    });
  }
);


export const getFilteredProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 12;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const {
      tags,
      metal,
      color,
      designType,
      style,
      occsasion,
      stone,
      shape,
      minPrice,
      maxPrice,
      search,
      q,
      gender
    } = req.query;

    const query: any = { publish: true };
    const andFilters: any[] = [];

    // 1. GLOBAL SEARCH (Check both 'search' and 'q')
    const searchTerm = (search || q) as string;
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm.trim(), "i");
      andFilters.push({
        $or: [
          { title: searchRegex },
          { tags: { $in: [searchRegex] } },
          { designType: searchRegex },
          { style: { $elemMatch: { $regex: searchRegex } } },
          { occsasion: { $elemMatch: { $regex: searchRegex } } },
          { productCode: searchRegex },
        ],
      });
    }

    // 2. TAGS FILTER
    if (tags) {
      const tagArray = (tags as string)
        .split(",")
        .map((t) => t.trim().toLowerCase());
      andFilters.push({ tags: { $in: tagArray } });
    }

    // 3. GENDER FILTER (Fixed: Added to andFilters instead of root query)
    if (gender) {
      const genderItems = (gender as string).split(",").map(g => g.trim());
      const genderRegex = genderItems.map(g => `^${g}$`).join("|");

      andFilters.push({
        gender: { $regex: genderRegex, $options: "i" }
      });
    }

    // 4. TOP LEVEL ATTRIBUTES (Design, Style, Stone)
    if (designType) {
      const items = (designType as string).split(",").map(i => new RegExp(`^${i.trim()}$`, "i"));
      andFilters.push({ designType: { $in: items } });
    }

    if (style) {
      const styles = (style as string)
        .split(",")
        .map(s => new RegExp(`^${s.trim()}$`, "i"));

      andFilters.push({
        style: { $elemMatch: { $in: styles } }
      });
    }

    if (occsasion) {
      const occasions = (occsasion as string)
        .split(",")
        .map(o => new RegExp(`^${o.trim()}$`, "i"));

      andFilters.push({
        occsasion: { $elemMatch: { $in: occasions } }
      });
    }



    if (stone) {
      const items = (stone as string).split(",").map(i => new RegExp(`^${i.trim()}$`, "i"));
      andFilters.push({ stone: { $in: items } });
    }

    // 5. NESTED VARIATION FILTERS
    const variationMatch: any = {};

    if (metal) {
      const metalArray = (metal as string).split(",").map(m => m.trim());
      variationMatch.metal = { $in: metalArray.map(m => new RegExp(`^${m}$`, "i")) };
    }

    if (color) {
      const colorArray = (color as string).split(",").map(c => c.trim());
      variationMatch.color = { $in: colorArray.map(c => new RegExp(`^${c}$`, "i")) };
    }

    if (shape) {
      const shapeArray = (shape as string).split(",").map(s => s.trim());
      variationMatch["shapes.shape"] = {
        $in: shapeArray.map(s => new RegExp(`^${s}$`, "i"))
      };
    }

    if (minPrice || maxPrice) {
      const priceFilter: any = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      variationMatch["shapes.carats.totalAmt"] = priceFilter;
    }

    if (Object.keys(variationMatch).length > 0) {
      andFilters.push({
        variations: { $elemMatch: variationMatch },
      });
    }

    // 6. APPLY ALL FILTERS TO THE $AND ARRAY
    if (andFilters.length > 0) {
      query.$and = andFilters;
    }

    // EXECUTE QUERY
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ order: 1, createdAt: -1 })
        .populate("category", "title slug")
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    // WISHLIST LOGIC
    let userId: string | null = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        userId = decoded._id;
      } catch (err) {
        userId = null;
      }
    }

    let wishlistedSlugs = new Set<string>();
    if (userId && products.length > 0) {
      const productSlugs = products.map((p) => p.slug);
      const wishlist = await Wishlist.find({
        userId,
        slug: { $in: productSlugs },
      }).lean();
      wishlist.forEach((w) => wishlistedSlugs.add(w.slug));
    }

    const data = products.map((p) => ({
      ...p,
      isWishlisted: wishlistedSlugs.has(p.slug),
    }));

    return res.status(200).json({
      success: true,
      message: "Filtered products fetched successfully",
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);


export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const regex = new RegExp(query.trim(), "i"); // case-insensitive search

    const products = await Product.find({
      $or: [{ title: regex }, { slug: regex }],
      publish: true,
    })
      .select("title slug -_id")
      .populate("category", "slug")
      .limit(5)
      .lean();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  }
);

export const createManyProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products array is required",
      });
    }

    const createdProducts = await Product.insertMany(products, {
      ordered: true,
    });

    return res.status(201).json({
      success: true,
      message: "Products created successfully",
      data: createdProducts,
    });
  }
);

