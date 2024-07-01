import { NextFunction, Request, Response } from "express";

export function errorHandler(app: any) {
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const errorCode = error.errorCode;
    const statusCode = error.statusCode || 500;
    const data = error.data || error.message;
    const errorResponse = {
      statusCode: statusCode,
      errorCode: errorCode,
      errorMessage: data,
    };
    return res.status(statusCode).json(errorResponse);
  });
}
