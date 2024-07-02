import { inject, injectable } from "inversify";
import { IProductRepository } from "./interfaces/IProductRepository";
import { PrismaClient } from "@prisma/client";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { ICategoryRepository } from "./interfaces/ICategoryRepository";
import { CreateProductResponseDto } from "../dtos/responses/product.dto";
import { Product } from "../models/product.model";

const prisma = new PrismaClient();

@injectable()
export class ProductRepository implements IProductRepository {
  private _prisma: PrismaClient;
  private _categoryRepository: ICategoryRepository;

  constructor(
    @inject(INTERFACE_TYPE.CategoryRepository)
    categoryRepository: ICategoryRepository
  ) {
    this._categoryRepository = categoryRepository;
    this._prisma = prisma;
  }

  async getTotalCount(): Promise<number> {
    return this._prisma.product.count();
  }

  async findAll(
    skip: number,
    limit: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<{ products: Product[]; totalCount: number }> {
    const products = await this._prisma.product.findMany({
      take: limit,
      skip,
      orderBy: {
        [orderByField]: sortOrder,
      },
      include: {
        categories: true,
      },
    });

    const totalCount = await this.getTotalCount();

    return {
      products: products.map((p) => CreateProductResponseDto(p)),
      totalCount,
    };
  }
}
