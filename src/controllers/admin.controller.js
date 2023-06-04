import { hashPasswd, read, write } from "../utils/model.js";
import jwt from "../utils/jwt.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors.js";
import adminModel from "../model/admin.model.js";

export const LOGIN = async (req, res, next) => {
  // const admins = read("admins");
  let { username, password } = req.body;

  password = hashPasswd(password);

  try {
    const admin = await adminModel.adminLogin({ username, password });

    if (!admin) return next(new BadRequestError("Invalid username or password"));

    const token = jwt.sign({ admin_id: admin.admin_id });

    admin.password = null;

    res.status(200).json({
      status: 200,
      message: "success",
      token,
      data: admin,
    });
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};

export const POSTER_STATUS = (req, res, next) => {
  const posters = read("posters");

  const { poster_status } = req.body;
  const { id } = req.params;

  const findPoster = posters.find((poster) => poster.poster_id === +id);

  try {
    if (!findPoster)
      return next(new NotFoundError(`poster_id: ${id} Not found`));

    if (poster_status === "active") findPoster.poster_status = "active";

    if (poster_status === "archive") findPoster.poster_status = "archive";

    write("posters", posters);

    res.status(200).json({ status: 200, message: "success", data: findPoster });
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
