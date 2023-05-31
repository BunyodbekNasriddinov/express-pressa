import { Router } from "express";
import { LOGIN, POSTER_STATUS } from "../controllers/admin.controller.js";
import validateHandler from "../middlewares/validateHandler.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

// username: admin, password: admin
router.post("/admin/login", validateHandler, LOGIN);
router.patch("/admin/poster/:id", checkToken, POSTER_STATUS);

export default router;
