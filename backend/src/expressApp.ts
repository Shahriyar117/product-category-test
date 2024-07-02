import express from "express";
import cors from "cors";
import apiRouter from "./api/";
import { errorHandler } from "./middlewares/application/errorHandle.middleware";

// Extend the Request interface to include a custom 'input' property
declare global {
  namespace Express {
    interface Request {
      payload: any;
      uploadPath: string;
    }
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

errorHandler(app);

export default app;
