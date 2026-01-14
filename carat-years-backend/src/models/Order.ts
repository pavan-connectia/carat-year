import { Schema, Document, model } from "mongoose";

export interface IPriceDetails {
  metalAmt: number;
  labourAmt: number;
  diamondAmtTotal: number;
  totalAmt: number;
  labDiscountAmt: number;
  diamondDiscountAmt: number;
  totalDiscountAmt: number;
  finalAmt: number;
}

export interface IOrderItem {
  product: Schema.Types.ObjectId;
  title: string;
  slug: string;
  category: string;
  image?: string;
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
  priceDetails: IPriceDetails;
}

export interface IOrderAddress {
  type: string;
  name: string;
  email: string;
  phone: string;
  pincode: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  isDefault: boolean;
}

export interface IDiscountInfo {
  code?: string | null;
  labDiscount?: number;
  diamondDiscount?: number;
  totalDiscount?: number;
} 

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  items: IOrderItem[];
  address: IOrderAddress;
  discountInfo?: IDiscountInfo;
  subtotal: number;
  totalLabDiscount: number;
  totalDiamondDiscount: number;
  totalDiscount: number;
  finalTotal: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

const priceDetailsSchema = new Schema<IPriceDetails>(
  {
    metalAmt: Number,
    labourAmt: Number,
    diamondAmtTotal: Number,
    totalAmt: Number,
    labDiscountAmt: Number,
    diamondDiscountAmt: Number,
    totalDiscountAmt: Number,
    finalAmt: Number,
  },
  { _id: false }
);

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    title: String,
    slug: String,
    category: String,
    image: String,
    metal: String,
    color: String,
    designType: String,
    style: { type: [String], required: true },
    stone: String,
    shape: String,
    carat: Number,
    size: String,
    quantity: Number,
    price: Number,
    priceDetails: { type: priceDetailsSchema, required: true },
  },
  { _id: false }
);

const orderAddressSchema = new Schema<IOrderAddress>(
  {
    type: String,
    name: String,
    email: String,
    phone: String,
    pincode: String,
    state: String,
    city: String,
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    isDefault: Boolean,
  },
  { _id: false }
);

const discountInfoSchema = new Schema<IDiscountInfo>(
  {
    code: { type: String, default: null },
    labDiscount: { type: Number, default: 0 },
    diamondDiscount: { type: Number, default: 0 },
    totalDiscount: { type: Number, default: 0 },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    address: { type: orderAddressSchema, required: true },
    discountInfo: { type: discountInfoSchema, default: null },
    subtotal: { type: Number, required: true },
    totalLabDiscount: { type: Number, default: 0 },
    totalDiamondDiscount: { type: Number, default: 0 },
    totalDiscount: { type: Number, default: 0 },
    finalTotal: { type: Number, required: true },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
