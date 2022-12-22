import type { Express } from "express";
import { notFound } from "../controllers/not-found";
import { AuthRoutes } from "./auth";
import { ContactRoutes } from "./contact";

export default function AppRoutes(app: Express) {
  app.use("/contacts", ContactRoutes);
  app.use("/auth", AuthRoutes);

  app.all("*", notFound);
}
