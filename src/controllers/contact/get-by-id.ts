import { isValidObjectId } from "mongoose";
import type { Response } from "express";
import type { IAuthRequest, IContact, IUser } from "../../@types";
import { ContactModel, UserModel } from "../../models";
import { isEmpty } from "../../resources";

export async function getById(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;
  const params = request.params;
  let contacts: IContact[] = [];

  try {
    if (!isValidObjectId(decodedUser?._id)) throw new Error("invalid id");

    const user = await UserModel.findById(decodedUser!._id).populate(
      "contacts"
    );
    if (isEmpty(user))
      return response.status(404).json({ message: "user not found" });

    contacts = user!.contacts as IContact[];
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    let contact = contacts.find((item) => String(item._id) === params.id);
    if (isEmpty(contact))
      return response.status(404).json({ message: "contact not found" });

    let seen = contact!.seen;
    seen += 1;

    await ContactModel.findByIdAndUpdate(contact!._id, { seen });

    return response
      .status(200)
      .json({ message: "ok", count: 1, data: contact });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
