import { Category } from "../../models/category.model";

export function GetCategoriesResponseDto(prismaCategory: any): Category {
  return {
    id: prismaCategory.id,
    name: prismaCategory.name,
    parentId: prismaCategory?.parentId,
  };
}
