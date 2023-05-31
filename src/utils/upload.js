import multer from "multer";
import { resolve } from "path";

export default multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve("uploads"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),

  fileFilter: (req, file, cb) => {
    const { mimetype } = file;

    if (
      mimetype === "image/png" ||
      mimetype === "image/jpg" ||
      mimetype === "image/gif" ||
      mimetype === "image/webp" ||
      mimetype === "image/jpeg"
    )
      return cb(null, true);

    cb(null, false);
    return (req.fileFormatter =
      "Only .png, .jpg, .jpeg, .gif, .webp format allowed!");
  },

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
