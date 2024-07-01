import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { ICategoryService } from "../services/interfaces/ICategoryService";

@injectable()
export class CategoryController {
  private categoryService: ICategoryService;

  constructor(
    @inject(INTERFACE_TYPE.CategoryService) service: ICategoryService
  ) {
    this.categoryService = service;
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = 1,
        limit = 10,
        orderByField = "name",
        sortOrder = "asc",
      } = req.query;

      // Validate and parse sortOrder
      const validSortOrder =
        sortOrder === "desc" || sortOrder === "asc" ? sortOrder : "asc";

      const categories = await this.categoryService.getAllCategories(
        Number(page),
        Number(limit),
        orderByField.toString(),
        validSortOrder
      );

      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
