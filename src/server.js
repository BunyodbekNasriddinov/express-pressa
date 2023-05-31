import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";

import allRoutes from "./routes/all.routes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// all routes
app.use(allRoutes);

app.use(errorHandler);

app.listen(PORT, console.log(`server running ${PORT}`));
