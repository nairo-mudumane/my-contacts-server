import { model, Schema } from "mongoose";
import type { IUser } from "../@types";

const UserSchema = new Schema<IUser>(
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
    favorites: [
      {
        ref: "contacts",
        type: Schema.Types.ObjectId,
      },
    ],
    contacts: [
      {
        ref: "contacts",
        type: Schema.Types.ObjectId,
      },
    ],
    avatar: String,
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("users", UserSchema, "users");
