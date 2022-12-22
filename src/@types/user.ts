import type { ObjectId } from "mongoose";
import type { IContact } from "./contact";
import type { IMongooseData } from "./mongoose";

export interface IUser extends IMongooseData {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  avatar: string;
  favorites: ObjectId[] | IContact[];
  contacts: ObjectId[] | IContact[];
}

export interface INewUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
  token?: string;
}

export interface INewUserFormatted extends INewUser {
  fullname: string;
  favorites: ObjectId[] | IContact[];
  contacts: ObjectId[] | IContact[];
  avatar?: string;
}
