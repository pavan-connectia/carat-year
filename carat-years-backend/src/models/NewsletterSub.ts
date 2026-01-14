import { Schema, Document, model } from "mongoose";

export interface INewsletterSub extends Document {
  name: string;
  email: string;
  createdAt: string;
}

const newsletterSubSchema = new Schema<INewsletterSub>(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },

    email: {
      type: String,
      required: [true, "Emal can't be empty"],
      unique: true,
    },
  },
  { timestamps: true }
);

export const NewsletterSub = model<INewsletterSub>(
  "NewsletterSub",
  newsletterSubSchema
);
