import { BadRequestError } from "../errors/errors.js";
import upload from "../utils/upload.js";

export default (req, res, next) => {
  return upload.single("avatar")(req, res, (err) => {
    if (err) {
      return next(new BadRequestError(err.message));
    } else {
      if (req.fileFormatter) {
        return next(new BadRequestError(req.fileFormatter));
      } else {
        return next();
      }
    }
  });
};
