import { Schema, model, Document, models } from "mongoose";

export interface IDiscount extends Document {
  code: string;
  description: string;
  labDiscount: number;
  diamondDiscount: number;
  order: number;
  publish: boolean;
}

const discountSchema = new Schema<IDiscount>(
  {
    code: {
      type: String,
      required: true["Title can't be empty"],
    },
    description: String,
    labDiscount: { type: Number, required: true, default: 0 },
    diamondDiscount: { type: Number, required: true, default: 0 },
    order: { type: Number },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

discountSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastDiscount = await models.Discount.findOne()
      .sort("-order")
      .exec();
    this.order = lastDiscount ? lastDiscount.order + 1 : 1;
  }

  next();
});

export const Discount = model<IDiscount>("Discount", discountSchema);
