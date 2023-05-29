import Joi from "joi";

export const LoginSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

export const RegisterSchema = Joi.object({
	username: Joi.string()
		.min(2)
		.max(32)
		.pattern(new RegExp("^[a-z0-9]{3,30}$"))
		.required(),
	password: Joi.string().min(8).max(100).required(),
	avatar: Joi.string().pattern(new RegExp("((jpe?g|png|gif|bmp))$")).required(),
});

export const VideoCreateSchema = Joi.object({
	title: Joi.string().required(),
	video: Joi.string().pattern(/((mkv|mp4|mov|mpeg))$/).required(),
});
