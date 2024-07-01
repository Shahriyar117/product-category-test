import { injectable } from "inversify";
import { ICategoryRepository } from "./interfaces/ICategoryRepository";
import { PrismaClient } from "@prisma/client";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
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
