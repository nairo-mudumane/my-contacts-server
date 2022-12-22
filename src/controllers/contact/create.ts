import { isValidObjectId } from "mongoose";
import type { Response } from "express";
import type { IAuthRequest, IContact, INewContact, IUser } from "../../@types";
import {
  checkPayloadFields,
  formatContact,
  isEmpty,
  removeFile,
} from "../../resources";
import { CloudUpload } from "../../services";
import { ContactModel, UserModel } from "../../models";

export async function create(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;
  const payload = request.body as INewContact;
  const file = request.file;
  let avatar: string | undefined;
  let user: IUser | null = null;

  try {
    checkPayloadFields(payload, ["firstname", "lastname", "email", "phone"]);

    if (!isValidObjectId(decodedUser?._id)) throw new Error("invalid id");

    user = await UserModel.findById(decodedUser?._id).populate("contacts");
    if (isEmpty(user))
      return response.status(404).json({ message: "user not found" });

    const contacts = user!.contacts as IContact[];

    contacts.forEach((contact) => {
      if (contact.email === payload.email || contact.phone === payload.phone)
        throw new Error("contact already exists");
    });
  } catch (error: Error | any) {
    if (file) await removeFile(file.path);
    return response.status(400).json({ message: error.message });
  }

  try {
    const upload = new CloudUpload();
    avatar = await upload.single({
      destination: "users",
      filename: file!.filename,
      filepath: file!.path,
    });

    const formatted = formatContact(payload);
    const created = await ContactModel.create({ ...formatted, avatar });

    const contacts = user!.contacts as IContact[];
    contacts.push(created);

    await UserModel.findByIdAndUpdate(user!._id, { contacts });

    return response.status(201).json({
      message: "ok",
      count: 1,
      data: {
        _id: created._id,
      },
    });
  } catch (error: Error | any) {
    if (file) await removeFile(file.path);
    return response.status(500).json({ message: error.message });
  }
}
