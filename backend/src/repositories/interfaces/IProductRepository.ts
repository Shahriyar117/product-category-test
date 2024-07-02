import { Product } from "../../models/product.model";

export interface IProductRepository {
  create(
    product: Omit<Product, "id | categories">,
    categoryNames: string[],
    parentCategoryName?: string
  ): Promise<Product>;

  getTotalCount(): Promise<number>;

  findAll(
    skip: number,
    limit: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<{ products: Product[]; totalCount: number }>;
}
