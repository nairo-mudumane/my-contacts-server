import { isValidObjectId } from "mongoose";
import type { Response } from "express";
import type { IAuthRequest, IUser } from "../../@types";
import { UserModel } from "../../models";
import { isEmpty } from "../../resources";

export async function getAll(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;
  let user: IUser | null = null;

  try {
    if (!isValidObjectId(decodedUser?._id)) throw new Error("invalid id");

    user = await UserModel.findById(decodedUser!._id).populate({
      path: "contacts",
      options: { sort: { fullname: 1 } },
    });

    if (isEmpty(user))
      return response.status(404).json({ message: "user not found" });

    if (!user) return response.status(404).json({ message: "user not found" });
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    const contacts = user.contacts;
    const count = user.contacts.length;

    return response.status(200).json({ message: "ok", count, data: contacts });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
