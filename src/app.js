import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import notFoundHandler from "./middlewares/notFoundHandler.middleware.js";
import ApiRouter from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api", ApiRouter);

app.all("/*splat", notFoundHandler);
app.use(errorHandler);

export default app;
