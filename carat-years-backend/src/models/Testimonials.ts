import { models, Schema, Document, model } from "mongoose";

export interface ITestimonials extends Document {
  image: string;
  name: string;
  role: string;
  description: string;
  star: number;
  order: number;
  publish: boolean;
}

const testimonialsSchema = new Schema<ITestimonials>(
  {
    image: { type: String, required: [true, "Image can't be empty"] },
    name: { type: String, required: [true, "Name can't be empty"] },
    role: { type: String, required: [true, "Role can't be empty"] },
    description: {
      type: String,
      required: [true, "Description can't be empty"],
    },
    star: { type: Number, max: 5, min: 1, default: 5 },
    order: { type: Number },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

testimonialsSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastTestimonials = await models.Testimonials.findOne()
      .sort("-order")
      .exec();
    this.order = lastTestimonials ? lastTestimonials.order + 1 : 1;
  }

  next();
});

export const Testimonials = model<ITestimonials>(
  "Testimonials",
  testimonialsSchema
);
