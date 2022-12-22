import type { IMongooseData } from "./mongoose";

export interface IContact extends IMongooseData {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  phone: number;
  favorite: boolean;
  seen: number;
  avatar: string;
}

export interface INewContact {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: number;
}

export interface INewContactFormatted extends INewContact {
  fullname: string;
  avatar?: string;
}
