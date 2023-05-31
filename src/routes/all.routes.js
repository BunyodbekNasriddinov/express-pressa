import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import postersRoutes from './poster.routes.js'
import swaggerRoute from '../utils/swagger.js'

const router = Router();

/*
  /admin login
  username: admin
  password: admin
*/
router.use(adminRoutes);

// /posters route
router.use(postersRoutes)

router.use(swaggerRoute)

export default router;
