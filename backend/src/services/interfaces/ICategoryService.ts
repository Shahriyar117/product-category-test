import { Category } from "@prisma/client";

export interface ICategoryService {
  getAllCategories(
    page: number,
    pageSize: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<Category[]>;
}
