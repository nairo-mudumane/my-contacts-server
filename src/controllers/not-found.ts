import type { Request, Response } from "express";

export async function notFound(request: Request, response: Response) {
  const message = `can't ${request.method} ${request.path}`;
  return response.status(400).json({ message });
}
