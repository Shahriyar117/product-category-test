import { injectable } from "inversify";
import { ICategoryRepository } from "./interfaces/ICategoryRepository";
import { PrismaClient } from "@prisma/client";
import { Category } from "../models/category.model";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async findOrCreateWithinTransaction(
    prisma: PrismaClient,
    categoryName: string,
    parentCategoryId: number | null
  ): Promise<Category | null> {
    let category = await prisma.category.findFirst({
      where: { name: categoryName },
    });

    if (parentCategoryId && category) {
      await prisma.category.update({
        where: {
          name: categoryName,
        },
        data: {
          parentId: parentCategoryId,
        },
      });
    }

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          parentId: parentCategoryId,
        },
      });
    }

    return category;
  }

  async findAll(
    skip: number,
    take: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<any> {
    const categories = await this._prisma.category.findMany({
      take,
      skip,
      orderBy: {
        [orderByField]: sortOrder,
      },
      include: {
        subcategories: true,
        products: true,
      },
    });
    return categories;
  }
}
