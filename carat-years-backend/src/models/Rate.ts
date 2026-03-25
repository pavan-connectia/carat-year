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
    d11: number;
    d12: number;
    d13: number;
    d14: number;
    d15: number;
    d16: number;
    d17: number;
    d18: number;
    d19: number;
    d20: number;
    d21: number;
    d22: number;
    d23: number;
    d24: number;
    d25: number;
    d26: number;
    d27: number;
    d28: number;
    d29: number;
    d30: number;
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
      platinum: { type: Number, required: false, default: 0 },
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
      d11: { type: Number, required: true, default: 0 },
      d12: { type: Number, required: true, default: 0 },
      d13: { type: Number, required: true, default: 0 },
      d14: { type: Number, required: true, default: 0 },
      d15: { type: Number, required: true, default: 0 },
      d16: { type: Number, required: true, default: 0 },
      d17: { type: Number, required: true, default: 0 },
      d18: { type: Number, required: true, default: 0 },
      d19: { type: Number, required: true, default: 0 },
      d20: { type: Number, required: true, default: 0 },
      d21: { type: Number, required: true, default: 0 },
      d22: { type: Number, required: true, default: 0 },
      d23: { type: Number, required: true, default: 0 },
      d24: { type: Number, required: true, default: 0 },
      d25: { type: Number, required: true, default: 0 },
      d26: { type: Number, required: true, default: 0 },
      d27: { type: Number, required: true, default: 0 },
      d28: { type: Number, required: true, default: 0 },
      d29: { type: Number, required: true, default: 0 },
      d30: { type: Number, required: true, default: 0 },
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
