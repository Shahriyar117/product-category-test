import { Product } from "../../models/product.model";

export interface IProductService {
  createProduct(
    data: Omit<Product, "id | categories"> & {
      parentCategory: string;
      categories: string[];
    }
  ): Promise<Product>;

  getAllProducts(
    page: number,
    pageSize: number,
    orderByField: string,
    sortOrder: "asc" | "desc",
    categoryId?: number
  ): Promise<{ products: Product[]; totalPages: number; totalCount: number }>;
}
