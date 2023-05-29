const { write, read } = require("../utils/model");

const news = {
	GET: (req, res) => {
		try {
			const news = read("news");
			if (req.params.id) {
				const neww = news.find((neww) => neww.id === +req.params.id);

				if (!neww) {
					throw new Error("Bu id bo'yicha yangilik topilmadi!");
				}

				res.send(neww);
			} else {
				res.send(news);
			}
		} catch (error) {
			res.status(400).send({ status: 400, message: error.message });
		}
	},

	POST: (req, res) => {
		const news = read("news");
		const { title, description } = req.body;
		news.push({
			id: news.at(-1).id + 1 || 1,
			title,
			description,
			date: new Date(),
		});

		write("news", news);
		res.sendStatus(201);
	},

	PUT: (req, res) => {
		const news = read("news");
		const { title, description } = req.body;
		const { id } = req.params;
		const neww = news.find((neww) => neww.id === +id);

		try {
			if (!neww) {
				throw new Error("Bu id bo'yicha yangilik topilmadi");
			}

			neww.title = title || neww.title;
			neww.description = description || neww.description;

			write("news", news);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(400);
		}
	},

	DELETE: (req, res) => {
		const news = read("news");
		const { id } = req.params;
		const newId = news.findIndex((neww) => neww.id === +id);

		try {
			if (newId === -1) {
				throw new Error("Bu id bo'yicha yangilik topilmadi");
			}

			news.splice(newId, 1);

			write("news", news);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(400);
		}
	},
};

module.exports = news;
