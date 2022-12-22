import type { Request } from "express";
import type { ObjectId } from "mongoose";

export type IDecodedUser = { _id: ObjectId };

export interface IAuthRequest extends Request {
  user?: IDecodedUser;
}
