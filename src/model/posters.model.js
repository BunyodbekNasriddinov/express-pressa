import { fetchAll } from "./setup.js";

const allPosters = async ({ offset, limit }) => {
  const posters = await fetchAll(
    `SELECT *
     FROM posters AS p 
     JOIN subcategories AS s ON p.sub_category_id = s.sub_category_id
     JOIN authors AS a ON p.author_id = a.author_id
     JOIN categories AS c ON s.category_id = c.category_id
     WHERE p.poster_status = 'active'
     ORDER BY p.poster_started_date DESC
     OFFSET $1
     LIMIT $2`,
    [offset, limit]
  );

  return posters;
};

const createPoster = async ({
  poster_title,
  poster_body,
  poster_started_date,
  poster_image,
  poster_event_type,
  poster_link,
  author_id,
  sub_category_id,
}) => {
  const poster = await fetchAll(
    `INSERT INTO posters(poster_title, poster_body, poster_started_date, poster_image, poster_event_type, poster_link, author_id, sub_category_id, poster_views, poster_status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
     RETURNING *
    `,
    [
      poster_title,
      poster_body,
      poster_started_date,
      poster_image,
      poster_event_type,
      poster_link,
      author_id,
      sub_category_id,
      0,
      "pending",
    ]
  );

  return poster;
};

const posterById = async ({ id }) => {
  return await fetchAll(
    `UPDATE posters
     SET poster_views = poster_views + 1
     WHERE poster_id = $1
     RETURNING *
    `,
    [+id]
  );
};

export default {
  allPosters,
  createPoster,
  posterById,
};
