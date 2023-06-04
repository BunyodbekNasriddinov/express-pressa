import { hashPasswd } from "../utils/model.js";
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

    if (!admin)
      return next(new BadRequestError("Invalid username or password"));

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

export const POSTER_STATUS = async (req, res, next) => {
  const { poster_status } = req.body;
  const { id } = req.params;

  try {
    if (
      poster_status === "active" ||
      poster_status === "archive" ||
      poster_status === "deleted"
    ) {
      const rows = await adminModel.posterStatus({ id, poster_status });

      if (!rows.length)
        return next(new NotFoundError(`poster_id: ${id} Not found`));

      res.status(200).json({ status: 200, message: "success", data: rows[0] });
    } else return next(new BadRequestError("poster_status invalid"));
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
