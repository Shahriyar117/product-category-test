import { inject, injectable } from "inversify";
import { IProductService } from "./interfaces/IProductService";
import { Product } from "../models/product.model";
import { INTERFACE_TYPE } from "../utils/appConstant";
import { IProductRepository } from "../repositories/interfaces/IProductRepository";

@injectable()
export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository
  ) {
    this.productRepository = repository;
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
