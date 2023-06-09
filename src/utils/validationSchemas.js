import Joi from "joi";

// admin login schema
export const AdminLoginSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(4)
    .max(32)
    .regex(/([a-z])\w+/),
  password: Joi.string().required().min(4).max(24),
});

// admin login schema
export const PosterCreateSchema = Joi.object({
  poster_title: Joi.string().required().min(24).max(64),
  poster_body: Joi.string().required().min(32).max(260),
  poster_started_date: Joi.string()
    .required()
    .regex(/^(?:\d{2})-(?:\d{2})-(?:\d{4})\/(?:\d{2}):(?:\d{2})$/), //22-01-2022/14:00 => dd-mm-yyyy/hh:mm
  poster_image: Joi.string()
    .required()
    .regex(/((jpe?g|png|gif|webp))$/), // .jpg .jpeg .png .gif .webp
  poster_event_type: Joi.string().required().min(6).max(7), // onlin - offline
  poster_link: Joi.string().required().min(8).max(64),
  author_id: Joi.number().required(),
  sub_category_id: Joi.number().required(),
});
