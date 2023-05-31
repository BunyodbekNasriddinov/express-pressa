import { hashPasswd, read } from "../utils/model.js";
import jwt from "../utils/jwt.js";
import { BadRequestError, InternalServerError } from "../utils/errors.js";

export const LOGIN = (req, res, next) => {
  const admins = read("admins");
  let { username, password } = req.body;

  password = hashPasswd(password);

  try {
    const admin = admins.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (!admin) return next(new BadRequestError("Invalid username or passord"));

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
