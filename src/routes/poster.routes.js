import { Router } from "express";
import {
  ALL_POSTERS,
  CREATE_POSTER,
} from "../controllers/poster.controller.js";
import validateHandler from "../middlewares/validateHandler.js";
import checkToken from "../middlewares/checkToken.js";
import multerHandler from "../middlewares/multerHandler.js";

const router = Router();

router.get("/posters", ALL_POSTERS);
router.post(
  ".poster",
  checkToken,
  validateHandler,
  multerHandler,
  CREATE_POSTER
);

export default router;
