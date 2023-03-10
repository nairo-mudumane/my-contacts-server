import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { ContactModel, UserModel } from "../../models";

export async function getById(request: IAuthRequest, response: Response) {
  const { user, params } = request;

  try {
    const contactModel = new ContactModel();
    const userModel = new UserModel();

    const exists = await userModel.getById(user!._id);
    if (!exists)
      return response.status(404).json({ message: "user not found" });

    const contact = await contactModel.getById(user!._id, params.id);

    if (!contact) return response.status(404).json({ message: "not found" });

    return response
      .status(200)
      .json({ message: "ok", count: 1, data: contact });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
