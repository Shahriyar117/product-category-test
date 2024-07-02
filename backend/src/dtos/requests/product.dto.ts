import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  price: number;

  image: File;

  @IsArray()
  categories: string[];

  @IsString()
  @IsOptional()
  parentCategory?: string;
}
