import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

const swaggerDoc = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: "youtube",
      description: "express-fileupload practice"
    },
    servers: [
      {
        url: "localhost"
      }
    ],

  },
  apis: [`${process.cwd()}/src/routers/*.js`]
})

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

export default router;