import type { Request } from "express";
import type { ObjectId } from "mongoose";

type IUser = { _id: ObjectId };

export interface IAuthRequest extends Request {
  user?: IUser;
}
