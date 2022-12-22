import { isValidObjectId } from "mongoose";
import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { UserModel } from "../../models";
import { isEmpty } from "../../resources";

export async function getById(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;

  try {
    if (!isValidObjectId(decodedUser?._id)) throw new Error("invalid id");

    const user = await UserModel.findById(decodedUser!._id).populate({
      path: "contacts",
      options: { sort: { fullname: 1 } },
    });

    if (isEmpty(user))
      return response.status(404).json({ message: "user not found" });

    return response.status(200).json({ message: "ok", count: 1, data: user });
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }
}
