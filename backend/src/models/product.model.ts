import { Category } from "./category.model";

export class Product {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly image: string,
    public readonly categories: Category[],
    public readonly id?: number
  ) {}
}
