import { Router } from "express";
import * as controller from "../controllers/auth";
import * as userController from "../controllers/user";
import { authUser } from "../middlewares";

const router = Router();

router.post("/new", controller.create);
router.post("/login", controller.login);

router.use(authUser);
router.get("/profile", userController.getById);

export { router as AuthRoutes };
