import {
  AdminLoginSchema,
  PosterCreateSchema,
} from "../utils/validationSchemas.js";

import { BadRequestError, InternalServerError } from "../utils/errors.js";

export default (req, res, next) => {
  const { url, method, body, file } = req;
  try {
    // admin login route validation
    if (url === "/admin/login" && method === "POST") {
      const { error } = AdminLoginSchema.validate(body);
      if (error) return next(new BadRequestError(error.details[0].message));
    }

    // poster creat route validation
    if (url === "/poster" && method === "POST") {
      const { error } = PosterCreateSchema.validate({
        ...body,
        poster_image: file.originalname,
      });
      if (error) return next(new BadRequestError(error.details[0].message));
    }

    next();
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
