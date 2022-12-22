import { isValidObjectId } from "mongoose";
import type { Response } from "express";
import type { IAuthRequest, IContact } from "../../@types";
import { ContactModel, UserModel } from "../../models";
import { checkPayloadFields, isEmpty } from "../../resources";

export async function toggleFavorite(
  request: IAuthRequest,
  response: Response
) {
  const { user: decodedUser } = request;
  const params = request.params;
  const payload = request.body;
  let contacts: IContact[] = [];

  try {
    if (!isValidObjectId(decodedUser?._id)) throw new Error("invalid id");

    const user = await UserModel.findById(decodedUser!._id).populate(
      "contacts"
    );
    if (isEmpty(user))
      return response.status(404).json({ message: "user not found" });

    contacts = user!.contacts as IContact[];

    checkPayloadFields(payload, ["favorite"]);
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    let contact = contacts.find((item) => String(item._id) === params.id);
    if (isEmpty(contact))
      return response.status(404).json({ message: "contact not found" });

    await ContactModel.findByIdAndUpdate(contact!._id, {
      favorite: payload.favorite,
    });

    return response.status(200).json({ message: "ok", count: 1 });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
