import type { Request, Response } from "express";
import type { INewUser, IUser } from "../../@types";
import { UserModel } from "../../models";
import {
  checkPayloadFields,
  formatUser,
  generateLoginToken,
  isEmpty,
} from "../../resources";

export async function create(request: Request, response: Response) {
  const payload = request.body as INewUser;

  try {
    checkPayloadFields(payload, ["firstname", "lastname", "email"]);

    let exists = await UserModel.findOne({ email: payload.email });
    if (isEmpty(exists)) throw new Error("email already exists");
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    const formattedUser = formatUser(payload);

    const created = await UserModel.create({ ...formattedUser }).then(
      (result) => {
        if (result)
          //  @ts-ignore
          return result._doc as IUser;
        return null;
      }
    );

    const token = generateLoginToken({ _id: created!._id });

    return response.status(201).json({
      message: "created",
      count: 1,
      data: { ...created, token },
    });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
