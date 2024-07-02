import { inject, injectable } from "inversify";
import { IProductRepository } from "./interfaces/IProductRepository";
import { PrismaClient } from "@prisma/client";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { ICategoryRepository } from "./interfaces/ICategoryRepository";
import { CreateProductResponseDto } from "../dtos/responses/product.dto";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils/errors/app-errors";

const prisma = new PrismaClient();

async function executeOperationsInTransaction<T>(
  operations: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (prisma: any) => {
    return operations(prisma);
  });
}
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

  async create(
    product: Omit<Product, "id | categories">,
    categoryNames: string[],
    parentCategoryName?: string
  ): Promise<Product> {
    const createdProduct = await executeOperationsInTransaction(
      async (prisma) => {
        const categoryIds: (number | undefined)[] = await Promise.all(
          categoryNames.map(async (categoryName) => {
            let category =
              await this._categoryRepository.findOrCreateWithinTransaction(
                prisma,
                categoryName,
                null
              );

            if (parentCategoryName && category) {
              const parentCategory =
                await this._categoryRepository.findOrCreateWithinTransaction(
                  prisma,
                  parentCategoryName,
                  null
                );
              console.log("Parent Category ", parentCategory);
              if (parentCategory) {
                category =
                  await this._categoryRepository.findOrCreateWithinTransaction(
                    prisma,
                    categoryName,
                    parentCategory.id
                  );
                console.log("Category ", category);
              }
            }

            return category?.id;
          })
        );

        const createdProduct = await prisma.product.create({
          data: {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            categories: {
              connect: categoryIds.map((id) => ({ id })),
            },
          },
          include: {
            categories: true,
          },
        });

        if (!createdProduct) {
          throw new NotFoundError("Failed to create product");
        }

        return CreateProductResponseDto(createdProduct);
      }
    );

    return createdProduct;
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
