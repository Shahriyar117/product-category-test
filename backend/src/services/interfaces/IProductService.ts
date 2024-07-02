import { Product } from "../../models/product.model";

export interface IProductService {
  getAllProducts(
    page: number,
    pageSize: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<{ products: Product[]; totalPages: number; totalCount: number }>;
}
