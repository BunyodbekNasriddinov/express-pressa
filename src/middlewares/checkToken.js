import jwt from "jsonwebtoken";
import { AuthorizationError } from "../utils/errors";

export default (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) {
      next(new AuthorizationError("Token required"));
    }

    if (jwt.verify(token, process.env.SECRET_KEY)) {
      next();
    }
  } catch (error) {
    res.status(401).send(new AuthorizationError());
  }
};
