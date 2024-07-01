import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/application/errorHandle.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

errorHandler(app);

export default app;
