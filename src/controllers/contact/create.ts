import type { Response } from "express";
import { IAuthRequest } from "../../@types";

export async function create(request: IAuthRequest, response: Response) {
  return response.json({ "request.user": request.user });
}
