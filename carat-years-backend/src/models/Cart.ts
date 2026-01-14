import { Schema, Document, model, models } from "mongoose";

export interface ICartItem {
  product: Schema.Types.ObjectId;
  metal: string;
  color: string;
  designType: string;
  style: string[];
  stone: string;
  shape: string;
  carat: number;
  size: string;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  items: ICartItem[];
  subtotal: number;
  total: number;
  discountCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    metal: { type: String, required: true },
    color: { type: String, required: true },
    designType: { type: String, required: true },
    style: { type: [String], required: true },
    stone: { type: String, required: true },
    shape: { type: String, required: true },
    carat: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], default: [] },
    subtotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    discountCode: { type: String, default: null },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.subtotal = this.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  this.total = this.subtotal;
  next();
});

export const Cart = model<ICart>("Cart", cartSchema);
