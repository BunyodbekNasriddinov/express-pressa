import { fetchAll } from "./setup.js";

const adminLogin = async ({ username, password }) => {
  const admin = await fetchAll(
    "SELECT * FROM admins WHERE username = $1 AND  password = $2",
    [username, password]
  );
  return admin;
};

const posterStatus = async ({ id, poster_status }) => {
  return await fetchAll(
    `UPDATE posters
     SET poster_status = $2
     WHERE poster_id = $1 AND $2 = 'active' OR $2 = 'archive' OR $2 = 'deleted'       
     RETURNING *`,
    [id, poster_status]
  );
};

export default {
  adminLogin,
  posterStatus,
};
