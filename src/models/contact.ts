import { Schema, model } from "mongoose";
import type { IContact } from "../@types";

const ContactSchema = new Schema<IContact>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    seen: {
      type: Number,
      default: 0,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatar: String,
  },
  { timestamps: true }
);

export const ContactModel = model<IContact>(
  "contacts",
  ContactSchema,
  "contacts"
);
