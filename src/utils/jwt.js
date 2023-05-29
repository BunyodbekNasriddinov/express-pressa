import jwt from "jsonwebtoken";

const SECRET = 'olma'

export default {
  sign: (payload) => jwt.sign(payload, SECRET),
  verify: (token) => jwt.verify(token, SECRET),
};