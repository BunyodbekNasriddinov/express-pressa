export default (err, req, res, next) => {
  if (err.status !== 500) {
    res
      .status(err.status)
      .json({ status: err.status, name: err.name, message: err.message });
  }

  res.status(500).json({ status: 500, name: err.name });
};
