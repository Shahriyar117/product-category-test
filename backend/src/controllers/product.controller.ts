import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { IProductService } from "../services/interfaces/IProductService";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { NotFoundError, ValidationError } from "../utils/errors/app-errors";

@injectable()
export class ProductController {
  private productService: IProductService;

  constructor(@inject(INTERFACE_TYPE.ProductService) service: IProductService) {
    this.productService = service;
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let { name, description, price, categories, parentCategory } = req.payload;

    try {
      const product = await this.productService.createProduct({
        name,
        description,
        price: price,
        image: req.file?.path || "",
        categories,
        parentCategory,
      });
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        res.status(400).json({ error: error.message });
      } else {
        console.error("Error creating product:", error);
        next(error);
      }
    }
  }

  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        page = 1,
        limit = 10,
        orderByField = "name",
        sortOrder = "asc",
      } = req.query;
      const validSortOrder =
        sortOrder === "desc" || sortOrder === "asc" ? sortOrder : "asc";

      const { products, totalPages, totalCount } =
        await this.productService.getAllProducts(
          Number(page),
          Number(limit),
          orderByField.toString(),
          validSortOrder
        );

      res.status(200).json({ products, totalPages, totalCount });
    } catch (error) {
      console.error("Error fetching products:", error);
      next(error);
    }
  }
}
