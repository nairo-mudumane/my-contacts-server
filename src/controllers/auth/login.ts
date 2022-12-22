import type { Request, Response } from "express";
import type { IAuthCredentials, IUser } from "../../@types";
import {
  checkPayloadFields,
  generateLoginToken,
  isEmpty,
} from "../../resources";
import { UserModel } from "../../models";

export async function login(request: Request, response: Response) {
  const payload = request.body as IAuthCredentials;

  try {
    checkPayloadFields(payload, ["email"]);
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    const user = await UserModel.findOne({ email: payload!.email })
      .populate({ path: "contacts", options: { sort: { fullname: 1 } } })
      .then((result) => {
        if (result)
          //  @ts-ignore
          return result._doc as IUser;
        return null;
      });

    if (isEmpty(user))
      return response.status(404).json({ message: "user not found" });

    const token = generateLoginToken({ _id: user!._id });

    return response
      .status(200)
      .json({ message: "ok", count: 1, data: { ...user, token } });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
