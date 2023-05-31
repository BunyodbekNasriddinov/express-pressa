import { Router } from "express";
import { LOGIN } from "../controllers/admin.controller.js";
import validateHandler from "../middlewares/validateHandler.js";

const router = Router();

router.post("/admin/login", validateHandler, LOGIN);

export default router;
