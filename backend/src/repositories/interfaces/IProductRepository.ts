import { Product } from "../../models/product.model";

export interface IProductRepository {
  create(
    product: Omit<Product, "id | categories">,
    categoryNames: string[],
    parentCategoryName?: string
  ): Promise<Product>;

  findAll(
    skip: number,
    limit: number,
    orderByField: string,
    sortOrder: "asc" | "desc",
    categoryId?: number
  ): Promise<{ products: Product[]; totalCount: number }>;
}
