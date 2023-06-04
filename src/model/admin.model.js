import { fetchAll } from "./setup.js";

const adminLogin = async ({ username, password }) => {
  const admins = await fetchAll(
    "SELECT * FROM admins WHERE username = $1 AND  password = $2",
    [username, password]
  );
  return admins;
};

const posterStatus = async ({ id, poster_status }) => {
  const posters = await fetchAll(
    "SELECT poster_id, poster_status FROM posters UPDATE posters SET WHERE poster_id = $1 AND $2 = active OR $2 = archive OR $2 = deleted",
    [id, poster_status]
  );
};

export default {
  adminLogin,
  posterStatus,
};
