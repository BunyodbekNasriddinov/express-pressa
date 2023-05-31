import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

const swaggerDoc = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "pressa",
      description: "pressa master class posters",
    },
    servers: [
      {
        url: "localhost",
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "apiKey",
          name: "token",
          in: "header",
          description: "Please use login api to get access_token",
        },
      },
    },
  },
  apis: [
    `${process.cwd()}/src/swagger/components/**/*.yaml`,
    `${process.cwd()}/src/swagger/api/**/*.yaml`,
  ],
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default router;
