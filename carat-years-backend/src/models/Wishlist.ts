import { Schema, model, Types } from "mongoose";

export interface IWishlist {
  userId: Types.ObjectId;
  image: string;
  title: string;
  category: Types.ObjectId;
  slug: string;
  metal?: string;
  color?: string;
  designType?: string;
  style?: string;
  stone?: string;
  shape?: string;
  carat?: number;
  size?: string;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: String,
    title: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    slug: String,
    metal: String,
    color: String,
    designType: String,
    style: String,
    stone: String,
    shape: String,
    carat: Number,
    size: String,
  },
  { timestamps: true }
);

export const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
