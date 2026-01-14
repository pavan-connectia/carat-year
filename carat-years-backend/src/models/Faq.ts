import { models, Schema, Document, model } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  order: number;
  publish: boolean;
}

const faqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: [true, "Question can't be empty"] },
    answer: { type: String, required: [true, "Answer can't be empty"] },
    order: { type: Number },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

faqSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastFaq = await models.Faq.findOne().sort("-order").exec();
    this.order = lastFaq ? lastFaq.order + 1 : 1;
  }

  next();
});

export const Faq = model<IFaq>("Faq", faqSchema);
