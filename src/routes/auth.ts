import { Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

router.post("/new", userController.create);

export { router as AuthRoutes };
