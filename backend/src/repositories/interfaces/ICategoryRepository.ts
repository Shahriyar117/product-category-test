import { PrismaClient } from "@prisma/client";
import { Category } from "../../models/category.model";

export interface ICategoryRepository {
  findOrCreateWithinTransaction(
    prisma: PrismaClient,
    categoryName: string,
    parentCategoryId: number | null
  ): Promise<Category | null>;

  findAll(
    skip: number,
    take: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<any>;
}
