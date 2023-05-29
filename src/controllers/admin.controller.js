const { read, hashPasswd } = require("../utils/model");
const { sign } = require("jsonwebtoken");

const admin = {
	POST: (req, res) => {
		const admins = read("admin");
		let { username, password } = req.body;

		password = hashPasswd(password);

		const admin = admins.find(
			(admin) => admin.username === username && admin.password === password,
		);

		try {
			if (!admin) {
				throw new Error("Invalid username or password");
			}

			res.status(200).send({
				status: 200,
				message: "admin succesfully logged",
				accessToken: sign({ id: admin.id }, process.env.SECRET_KEY, {
					expiresIn: "1h",
				}),
			});
		} catch (error) {
			res.status(400).send({
				status: 400,
				message: error.message,
			});
		}
	},
};

module.exports = admin;
