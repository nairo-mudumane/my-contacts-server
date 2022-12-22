import type { IMongooseData } from "./mongoose";

export interface IUser extends IMongooseData {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  phone: number;
  avatar: string;
  seen: number;
  favorite: boolean;
}

export interface INewUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}
