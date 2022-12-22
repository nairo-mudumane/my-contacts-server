import type { IMongooseData } from "./mongoose";
import type { ObjectId } from "mongoose";

export interface IContact extends IMongooseData {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  favorite: boolean;
  seen: number;
  avatar: string;
}
