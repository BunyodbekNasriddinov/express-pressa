const { verify } = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const { token } = req.headers;
	try {
		if (!token) {
			throw new Error("Token required");
		}

		if (verify(token, process.env.SECRET_KEY)) {
			next();
		}
	} catch (error) {
		res.status(401).send({ status: 401, message: error.message });
	}
};
