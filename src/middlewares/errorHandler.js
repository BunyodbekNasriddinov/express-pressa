export default (err, req, res, next) => {
  if (!err.status === 500) return res.status(err.status).json(err);

  // process.env.ENV === "development";

  console.log(err);
  if (process.env.ENV === "development") {
    return res.json(err);
  }
  res.status(500).json(err);
};
