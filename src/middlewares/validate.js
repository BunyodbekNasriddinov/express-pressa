import {
	LoginSchema,
	RegisterSchema,
	VideoCreateSchema,
} from "../utils/validation.js";

import { BadRequestError, InternalServerError } from "../utils/errors.js";

export default (req, res, next) => {
	try {
		if (req.url === "/login" && req.method === "POST") {
			const { error } = LoginSchema.validate(req.body);
			if (error) return next(new BadRequestError(error));
		}
		if (req.url === "/register" && req.method === "POST") {
			const { error } = RegisterSchema.validate({
				avatar: req.files.avatar.name,
				...req.body,
			});
			if (error) return next(new BadRequestError(error));
		}
		if (req.url === "/admin/video" && req.method === "POST") {
			const { error } = VideoCreateSchema.validate({
				video: req.files.video.name,
				...req.body,
			});
			if (error) return next(new BadRequestError(error));
		}
		next();
	} catch (error) {
		return next(new InternalServerError(error));
	}
};
