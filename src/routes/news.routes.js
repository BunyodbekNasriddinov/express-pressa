const express = require("express");
const news = require("../controllers/news.controller");
const checkToken = require("../middlewares/checkToken");

const router = express.Router();

router.get("/:id?", news.GET);

router.post("/", checkToken, news.POST);

router.put("/:id", checkToken, news.PUT);

router.delete("/:id", checkToken, news.DELETE);

module.exports = router;
