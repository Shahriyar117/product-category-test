import { Product } from "../../models/product.model";
import { Category } from "../../models/category.model";
import { GetCategoriesResponseDto } from "./category.dto";

export function CreateProductResponseDto(prismaProduct: Product): Product {
  const categories: Category[] = prismaProduct.categories.map((category: any) =>
    GetCategoriesResponseDto(category)
  );

  return {
    id: prismaProduct.id,
    name: prismaProduct.name,
    description: prismaProduct.description,
    price: prismaProduct.price,
    image: prismaProduct.image,
    categories: categories,
  };
}
