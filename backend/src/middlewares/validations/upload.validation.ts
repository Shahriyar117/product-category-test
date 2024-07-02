import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../utils/errors/app-errors";

export function setUploadPath(uploadPath: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.uploadPath = uploadPath;
    next();
  };
}

export function uploadValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Check if the file is uploaded
  if (!req.file) {
    return next(new ValidationError("File Uploaded Failed!"));
  }
  next();
}
