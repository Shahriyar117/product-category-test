import { inject, injectable } from "inversify";
import { ICategoryService } from "./interfaces/ICategoryService";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { ICategoryRepository } from "../repositories/interfaces/ICategoryRepository";
import { Category } from "@prisma/client";

@injectable()
export class CategoryService implements ICategoryService {
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject(INTERFACE_TYPE.CategoryRepository) repository: ICategoryRepository
  ) {
    this.categoryRepository = repository;
  }

  async getAllCategories(
    page: number,
    pageSize: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<Category[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.categoryRepository.findAll(skip, take, orderByField, sortOrder);
  }
}
