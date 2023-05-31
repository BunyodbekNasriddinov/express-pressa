import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import { resolve } from "path";

import allRoutes from "./routes/all.routes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static(resolve("uploads")));

// pagenation default values
app.locals.pagination = {
  page: 1,
  limit: 9
};

// all routes
app.use(allRoutes);

app.use(errorHandler);

app.listen(PORT, console.log(`server running ${PORT}`));
