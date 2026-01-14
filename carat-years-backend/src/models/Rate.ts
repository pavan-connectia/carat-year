import { Schema, model, Document } from "mongoose";

export interface IRate extends Document {
  metal: {
    "9k": number;
    "14k": number;
    "18k": number;
    silver: number;
    platinum?: number;
  };
  diamond: {
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    d5: number;
    d6: number;
    d7: number;
    d8: number;
    d9: number;
    d10: number;
  };
  labour: {
    l1: number;
    l2: number;
    l3: number;
  };
}

const rateSchema = new Schema<IRate>(
  {
    metal: {
      "9k": { type: Number, required: true, default: 0 },
      "14k": { type: Number, required: true, default: 0 },
      "18k": { type: Number, required: true, default: 0 },
      silver: { type: Number, required: true, default: 0 },
      platinum:{ type: Number, required: false, default: 0 },
    },
    diamond: {
      d1: { type: Number, required: true, default: 0 },
      d2: { type: Number, required: true, default: 0 },
      d3: { type: Number, required: true, default: 0 },
      d4: { type: Number, required: true, default: 0 },
      d5: { type: Number, required: true, default: 0 },
      d6: { type: Number, required: true, default: 0 },
      d7: { type: Number, required: true, default: 0 },
      d8: { type: Number, required: true, default: 0 },
      d9: { type: Number, required: true, default: 0 },
      d10: { type: Number, required: true, default: 0 },
    },
    labour: {
      l1: { type: Number, required: true, default: 0 },
      l2: { type: Number, required: true, default: 0 },
      l3: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true }
);

export const Rate = model<IRate>("Rate", rateSchema);
