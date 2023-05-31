import jwt from "jsonwebtoken";
import { AuthorizationError } from "../utils/errors.js";

export default (req, res, next) => {
  try {
    if (!req.headers?.token) {
      next(new AuthorizationError("Token required"));
    }

    if (jwt.verify(req.headers?.token, process.env.SECRET_KEY)) {
      next();
    }
  } catch (error) {
    res.status(401).send(new AuthorizationError());
  }
};
