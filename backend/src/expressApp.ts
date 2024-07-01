import express from "express";
import cors from "cors";
import apiRouter from "./api/";
import { errorHandler } from "./middlewares/application/errorHandle.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

errorHandler(app);

export default app;
