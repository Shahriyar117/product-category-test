import { Product } from "../../models/product.model";

export interface IProductRepository {
  findAll(
    skip: number,
    limit: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<{ products: Product[]; totalCount: number }>;
}
