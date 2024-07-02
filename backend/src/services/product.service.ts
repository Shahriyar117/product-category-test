import { inject, injectable } from "inversify";
import { IProductService } from "./interfaces/IProductService";
import { Product } from "../models/product.model";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { IProductRepository } from "../repositories/interfaces/IProductRepository";
import { NotFoundError, ValidationError } from "../utils/errors/app-errors";

@injectable()
export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository
  ) {
    this.productRepository = repository;
  }

  async createProduct(
    data: Omit<Product, "id | categories"> & {
      parentCategory: string;
      categories: string[];
    }
  ): Promise<Product> {
    const { name, description, price, image, categories, parentCategory } =
      data;

    if (!name || !description || !price || !image || !categories) {
      throw new ValidationError("Missing required fields");
    }

    const product: Product = {
      name,
      description,
      price,
      image,
      categories: [],
    };

    const createdProduct = await this.productRepository.create(
      product,
      categories,
      parentCategory
    );

    if (!createdProduct) {
      throw new NotFoundError("Failed to create product");
    }

    return createdProduct;
  }

  async getAllProducts(
    page: number,
    pageSize: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<{ products: Product[]; totalPages: number; totalCount: number }> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const { products, totalCount } = await this.productRepository.findAll(
      skip,
      take,
      orderByField,
      sortOrder
    );
    const totalPages = Math.ceil(totalCount / pageSize);

    return { products, totalPages, totalCount };
  }
}
