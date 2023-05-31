export default (err, req, res, next) => {
  if (!err.status === 500) return res.status(err.status).json(err);

  if (process.env.ENV === "development") {
    console.log(err);
    return res.status(500).json(err);
  }
  res.status(500).json(err);
};
