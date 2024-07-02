import config from "../config";
import { Product } from "../types";

export const fetchProducts = async (
  page: number,
  pageSize: number,
  orderByField: string,
  sortOrder: string
): Promise<{ products: Product[]; totalPages: number; totalCount: number }> => {
  const response = await fetch(
    `${config.apiUrl}/products?page=${page}&limit=${pageSize}&orderByField=${orderByField}&sortOrder=${sortOrder}`
  );
  const data = await response.json();
  return data;
};
