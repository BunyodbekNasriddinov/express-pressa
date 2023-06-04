import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors.js";
import { queryFilter, read, write } from "../utils/model.js";
import { pagenation } from "../configs/config.js";
import postersModel from "../model/posters.model.js";

export const ALL_POSTERS = async (req, res, next) => {
  // let posters = read("posters");
  // const authors = read("authors");
  // const categories = read("categories");
  // const subCategories = read("subcategories");
  const { page: defaultPage, limit: defaultLimit } = pagenation;

  const page = req.query.page ? req.query.page : defaultPage;
  const limit = req.query.limit ? req.query.limit : defaultLimit;

  const offset = (page - 1) * limit;

  // posters = posters.splice(offset, limit);

  let posters = await postersModel.allPosters({ offset, limit });

  delete req.query.page;
  delete req.query.limit;

  // filter poster status active
  // posters = posters.filter((poster) => poster.poster_status === "active");

  // if (posters.length) {
  //   posters = posters.map((poster) => {
  //     // poster to author add
  //     poster.author = authors.find(
  //       (author) => author.author_id === poster.author_id
  //     );

  //     // poster to subcategory add
  //     poster.sub_categy = subCategories.find(
  //       (subcategory) => subcategory.sub_category_id === poster.sub_category_id
  //     );

  //     // poster to category add
  //     poster.category = categories.find(
  //       (category) => category.category_id === poster.sub_category_id
  //     );

  //     return poster;
  //   });
  // }
  console.log(posters);

  posters = queryFilter(req.query, posters);
  res.status(200).json({ status: 200, data: posters });
};

export const POSTER_BY_ID = async (req, res, next) => {
  const { id } = req.params;

  const rows = await postersModel.posterById({ id });

  try {
    if (!rows.length)
      return next(new NotFoundError(`Not Found poster_id: ${+id}`));

    console.log(rows);
    write("posters", posters);
    res.status(200).json({ status: 200, message: "success", data: rows[0] });
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};

export const CREATE_POSTER = async (req, res, next) => {
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
    const newPoster = {
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

    const rows = await postersModel.createPoster(newPoster);

    if (!rows.length) return new BadRequestError("");

    res.status(201).json({ status: 201, message: "success", data: newPoster });
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
