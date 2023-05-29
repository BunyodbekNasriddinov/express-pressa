const express = require("express");
const admin = require("../controllers/admin.controller");

const router = express.Router();

router.post("/", admin.POST);

module.exports = router;
