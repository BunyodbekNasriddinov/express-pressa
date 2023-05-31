import { BadRequestError, InternalServerError } from "../utils/errors.js";
import jwt from "../utils/jwt.js";
import { queryFilter, read } from "../utils/model.js";

export const ALL_POSTERS = (req, res, next) => {
  let posters = read("posters");
  const authors = read("authors");
  const categories = read("categories");
  const subCategories = read("subcategories");

  // filter poster status active
  posters = posters.filter((poster) => poster.poster_status === "active");

  if (posters.length) {
    posters = posters.map((poster) => {
      // poster to author add
      poster.author = authors.find(
        (author) => author.author_id === poster.author_id
      );

      // poster to subcategory add
      poster.sub_categy = subCategories.find(
        (subcategory) => subcategory.sub_category_id === poster.sub_category_id
      );

      // poster to category add
      poster.category = categories.find(
        (category) => category.category_id === poster.sub_category_id
      );

      return poster;
    });
  }

  posters = queryFilter(req.query, posters);

  res.status(200).json({ status: 200, data: posters });
};

export const CREATE_POSTER = (req, res, next) => {
  const posters = read("posters");
  const authors = read("authors");
  const categories = read("categories");
  const subCategories = read("subcategories");

  const {
    poster_title,
    poster_body,
    poster_started_date,
    poster_event_type,
    poster_link,
    author_id,
    sub_category_id,
  } = req.body;
  const { image } = req.file;

  try {
    const author_id = authors.find((author) => author.author_id === +author_id);

    if (!author_id) return next(new BadRequestError("author_id invalid"));

    const sub_category_id = subCategories.find(
      (sub_categy) => sub_categy.sub_category_id === +sub_category_id
    );

    if (!author_id) return next(new BadRequestError("author_id invalid"));

    const newPoster = {
      poster_id: posters.at(-1).poster_id + 1 || 1,
      poster_title,
      poster_body,
      poster_started_date,
      poster_image: image.filename,
      poster_event_type,
      poster_link,
      author_id,
      sub_category_id,
      poster_views: 0,
      poster_status: "pending",
    };
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
