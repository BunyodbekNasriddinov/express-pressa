import pkg from "pg";
import { InternalServerError } from "../utils/errors.js";
const { Pool } = pkg;
import "dotenv/config.js";

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});

export const fetchAll = async (SQL, params = []) => {
  const client = await pool.connect();

  try {
    const { rows } = client.query(SQL, params);
    console.log('rows: ', rows);
    return rows;
  } catch (error) {
    return new InternalServerError(error.message);
  } finally {
    client.release();
  }
};
