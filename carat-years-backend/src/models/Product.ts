import { Schema, Document, model, models } from "mongoose";
import slugify from "slugify";

export interface ICaratOption {
  carat: number;
  size: string[];
  diamondCount: number;
  diamondDimension: string;
  labourCategory: string;
  gWt: number;
  nWt: number;
  diamondCategory: string[];
  diamondWeight: number[];
  metalRate: number;
  labourRate: number;
  diamondRate: number[];
  diamondAmt: number[];
  metalAmt: number;
  labourAmt: number;
  totalAmt: number;
}

export interface IVariationShape {
  shape: string;
  images: string[];
  carats: ICaratOption[];
}

export interface IVariation {
  metal: string;
  color: string;
  shapes: IVariationShape[];
}

export interface IProduct extends Document {
  productCode: string;
  slug: string;
  title: string;
  description: string;
  category: Schema.Types.ObjectId;
  video: string,
  tags?: string[];
  variations: IVariation[];
  designType: string;
  style: string[];
  occsasion: string[];
  stone: string;
  reviews?: {
    averageRating: number;
    numberOfReviews: number;
  };
  gender: "Men" | "Women" | "Kids";
  publish: boolean;
  order?: number;
}

const caratSchema = new Schema<ICaratOption>(
  {
    carat: { type: Number, required: true },
    size: [{ type: String }],

    diamondCount: { type: Number, required: true },
    diamondDimension: { type: String, required: true },

    labourCategory: { type: String, required: true },

    gWt: { type: Number, required: true }, // Gross Weight
    nWt: { type: Number, required: true }, // Net Weight

    diamondCategory: { type: [String], required: true }, // Multiple categories allowed
    diamondWeight: [{ type: Number, required: true }],

    metalRate: { type: Number, required: true },
    labourRate: { type: Number, required: true },

    diamondRate: { type: [Number], required: true }, // multiple diamond rates
    diamondAmt: { type: [Number], required: true }, // diamondRate[i] * diamondWeight[i]

    metalAmt: { type: Number, required: true },
    labourAmt: { type: Number, required: true },
    totalAmt: { type: Number, required: true },
  },
  { _id: false }
);

const variationShapeSchema = new Schema<IVariationShape>(
  {
    shape: { type: String, required: true },
    images: { type: [String], default: [] },
    carats: { type: [caratSchema], default: [] },
  },
  { _id: false }
);

const variationSchema = new Schema<IVariation>(
  {
    metal: { type: String, required: true }, // 9k / 14k / 18k / S/L
    color: { type: String, required: true }, // yellow / white / rose
    shapes: { type: [variationShapeSchema], default: [] },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    productCode: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductCategory",
    },
    video: { type: String },
    tags: { type: [String], default: [] },
    variations: { type: [variationSchema], default: [] },
    designType: { type: String, required: true },
    style: { type: [String], required: true },
    occsasion: { type: [String], required: true },  
    stone: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      required: true,
    },
    reviews: {
      averageRating: { type: Number, default: 0 },
      numberOfReviews: { type: Number, default: 0 },
    },
    publish: { type: Boolean, default: true },
    order: { type: Number },
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  const product = this as any;

  if (product.isModified("slug") || product.isNew) {
    let baseSlug =
      product.slug || slugify(product.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await models.Product.findOne({ slug, _id: { $ne: product._id } })) {
      slug = `${baseSlug}-${count++}`;
    }

    product.slug = slug;
  }

  if (this.isNew) {
    const lastProduct = await models.Product.findOne().sort("-order").exec();
    this.order = lastProduct ? (lastProduct.order || 0) + 1 : 1;
  }

  next();
});

export const Product = model<IProduct>("Product", productSchema);
