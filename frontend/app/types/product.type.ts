import { Category } from "./category.type";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: Category[];
}
