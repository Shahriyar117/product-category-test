import { Product } from "./product.model";

export class Category {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly parentId?: number | null,
    public readonly parent?: Category | null,
    public readonly subcategories?: Category[],
    public readonly products?: Product[]
  ) {}
}
