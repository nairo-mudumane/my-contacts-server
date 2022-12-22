import type { ObjectId } from "mongoose";

export interface IMongooseData {
  _id: ObjectId;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}
