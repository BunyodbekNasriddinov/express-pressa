const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const newsRoute = require("./routes/news.routes");
const adminRoute = require("./routes/admin.routes");

app.use(cors());
app.use(express.json());
dotenv.config();

/*
  /news get all post => []
  /news post, put, delete token required
*/
app.use("/news", newsRoute);

/*
  username: admin
  password: admin
*/
app.use("/admin", adminRoute);

app.listen(8080, console.log("server running"));
