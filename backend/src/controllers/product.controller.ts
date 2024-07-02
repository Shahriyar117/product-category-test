import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { IProductService } from "../services/interfaces/IProductService";
import { INTERFACE_TYPE } from "../utils/appConstant";

@injectable()
export class ProductController {
  private productService: IProductService;

  constructor(@inject(INTERFACE_TYPE.ProductService) service: IProductService) {
    this.productService = service;
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
