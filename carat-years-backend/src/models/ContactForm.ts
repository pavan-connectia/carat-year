import mongoose, { Schema, Types, Document } from "mongoose";

export interface IContactForm extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactFormSchema = new Schema<IContactForm>(
  {
    name: { type: String, required: [true, "Name can't be empty"] },
    email: { type: String, required: [true, "Email can't be empty"] },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ContactForm = mongoose.model("ContactForm", ContactFormSchema);
