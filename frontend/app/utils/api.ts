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

export const fetchCategories = async () => {
  const response = await fetch(`${config.apiUrl}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

export const saveProduct = async (formData: FormData) => {
  const response = await fetch(`${config.apiUrl}/products`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to save product");
  }
  return response.json();
};
