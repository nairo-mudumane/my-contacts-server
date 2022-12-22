import { isValidObjectId } from "mongoose";
import type { Response } from "express";
import { IAuthRequest } from "../../@types";
import { UserModel } from "../../models";

export async function getAll(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;
  try {
    if (!isValidObjectId(decodedUser?._id)) throw new Error("invalid id");
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    const user = await UserModel.findById(decodedUser!._id).populate(
      "contacts"
    );
    if (!user) return response.status(404).json({ message: "user not found" });

    const contacts = user.contacts;
    const count = user.contacts.length;

    return response.status(200).json({ message: "ok", count, data: contacts });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
