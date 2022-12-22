import { Router } from "express";
import * as controller from "../controllers/contact";
import { authUser } from "../middlewares";

const router = Router();

router.use(authUser);
router.post("/", controller.create);

export { router as ContactRoutes };
