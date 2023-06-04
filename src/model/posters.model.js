import { fetchAll } from "./setup.js";

const allPosters = async () => {
  const posters = await fetchAll("SELECT * FROM posters");

  return posters;
};

const createPoster = async () => {
  const poster = await fetchAll(
    "INSERT INTO posters(poster_title, poster_body, poster_started_date, poster_image, poster_event_type, poster_link, author_id, sub_category_id, poster_views, poster_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      poster_title,
      poster_body,
      poster_started_date,
      poster_image,
      poster_event_type,
      poster_link,
      author_id,
      sub_category_id,
      poster_views,
      poster_status,
    ]
  );

  return poster;
};

export default {
  allPosters,
};
