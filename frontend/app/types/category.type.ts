import { Product } from "./product.type";

export interface Category {
  id: number;
  name: string;
  parentId?: number;
  parent?: Category;
  subcategories?: Category[];
  products?: Product[];
}
