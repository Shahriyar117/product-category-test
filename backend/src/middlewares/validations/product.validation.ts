import { NextFunction, Request, Response } from "express";
import { RequestValidator } from "../../utils/requestValidator";
import { ValidationError } from "../../utils/errors/app-errors";
import { CreateProductRequest } from "../../dtos/requests/product.dto";

export const createProductValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let categories = JSON.parse(req.body.categories);
  let price = parseInt(req.body.price);
  const { errors, input } = await RequestValidator(CreateProductRequest, {
    ...req.body,
    categories,
    price,
  });
  if (errors) return next(new ValidationError(errors.toString()));
  req.payload = input;

  next();
};
