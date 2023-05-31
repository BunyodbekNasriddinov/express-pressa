import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors.js";
import { queryFilter, read, write } from "../utils/model.js";
import { pagenation } from "../configs/config.js";

export const ALL_POSTERS = (req, res, next) => {
  let posters = read("posters");
  const authors = read("authors");
  const categories = read("categories");
  const subCategories = read("subcategories");
  const { page: defaultPage, limit: defaultLimit } = pagenation;

  const page = req.query.page ? req.query.page : defaultPage;
  const limit = req.query.limit ? req.query.limit : defaultLimit;

  const offset = (page - 1) * limit;

  posters = posters.splice(offset, limit);

  delete req.query.page;
  delete req.query.limit;

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
  res.status(200).json({ status: 200, data: posters.reverse() });
};

export const POSTER_BY_ID = (req, res, next) => {
  const posters = read("posters");

  const { id } = req.params;

  const poster = posters.find((poster) => poster.poster_id === +id);

  try {
    if (!poster) return next(new NotFoundError(`Not Found poster_id: ${+id}`));

    poster.poster_views += 1;

    console.log(poster);
    write("posters", posters);
    res.status(200).json({ status: 200, message: "success", data: poster });
  } catch (error) {}
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
  const { filename } = req.file;

  try {
    const find_author_id = authors.find(
      (author) => author.author_id === +author_id
    );

    if (!find_author_id) return next(new BadRequestError("author_id invalid"));

    const find_sub_category_id = subCategories.find(
      (sub_categy) => sub_categy.sub_category_id === +sub_category_id
    );

    if (!find_sub_category_id)
      return next(new BadRequestError("sub_category_id invalid"));

    const newPoster = {
      poster_id: posters.at(-1).poster_id + 1 || 1,
      poster_title,
      poster_body,
      poster_started_date,
      poster_image: filename,
      poster_event_type,
      poster_link,
      author_id: +author_id,
      sub_category_id: +sub_category_id,
      poster_views: 0,
      poster_status: "pending",
    };

    posters.push(newPoster);

    write("posters", posters);

    res.status(201).json({ status: 201, message: "success", data: newPoster });
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
