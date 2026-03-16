import mongoose, { models, Schema, Document, model } from "mongoose";

interface IHero {
  image: string;
  title: string;
  headLine: string;
  description: string;
  button1?: string;
  button2?: string;
}

interface ICustom {
  image: string;
  title: string;
  description: string;
  button: string;
}

export interface IHome extends Document {
  hero: IHero;
  custom: ICustom;
}

const heroSchema = new Schema<IHero>({
  image: { type: String, required: [true, "Image can't be empty"] },
  title: { type: String, required: [true, "Title can't be empty"] },
  headLine: { type: String, required: [true, "Image can't be HeadLine"] },
  description: { type: String, required: [true, "Description can't be empty"] },
  button1: { type: String, required: [true, "link required"] },
  button2: { type: String, required: [true, "link required"] },
});

const customSchema = new Schema<ICustom>({
  image: { type: String, required: [true, "Image can't be empty"] },
  title: { type: String, required: [true, "Title can't be empty"] },
  description: { type: String, required: [true, "Description can't be empty"] },
  button: { type: String, required: [true, "link required"] },
});

const homeSchema = new Schema<IHome>(
  {
    hero: heroSchema,
    custom: customSchema,
  },
  { timestamps: true }
);

export const Home = mongoose.model<IHome>("Home", homeSchema);