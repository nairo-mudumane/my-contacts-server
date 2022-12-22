import type { Request, Response } from "express";

export async function login(request: Request, response: Response) {
  return response.json({ ok: true });
}
