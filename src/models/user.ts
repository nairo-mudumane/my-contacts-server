import { model, Schema } from "mongoose";
import type { IUser } from "../@types";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
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
    favorite: {
      type: Boolean,
      default: false,
    },
    seen: {
      type: Number,
      default: 0,
    },
    avatar: String,
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("users", UserSchema, "users");
