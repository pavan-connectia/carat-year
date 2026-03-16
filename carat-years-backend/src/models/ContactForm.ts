import mongoose, { Schema, Types, Document } from "mongoose";

export interface IContactForm extends Document {
  name: string;
  email: string;
  message: string;
  phone: number;
}

const ContactFormSchema = new Schema<IContactForm>(
  {
    name: { type: String, required: [true, "Name can't be empty"] },
    email: {
      type: String,
      required: function () {
        return !this.phone;
      },
    },

    phone: {
      type: Number,
      required: function () {
        return !this.email;
      },
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ContactForm = mongoose.model("ContactForm", ContactFormSchema);
