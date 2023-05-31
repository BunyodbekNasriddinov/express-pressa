import { Router } from "express";
import {
  ALL_POSTERS,
  CREATE_POSTER,
  POSTER_BY_ID,
} from "../controllers/poster.controller.js";

// middlewares import
import validateHandler from "../middlewares/validateHandler.js";
import checkToken from "../middlewares/checkToken.js";
import multerHandler from "../middlewares/multerHandler.js";

const router = Router();

router.get("/posters", ALL_POSTERS);
router.get("/poster/:id", POSTER_BY_ID);
router.post(
  "/poster",
  checkToken,
  multerHandler,
  validateHandler,
  CREATE_POSTER
);

export default router;
