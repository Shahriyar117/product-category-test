import { injectable } from "inversify";
import { IProductService } from "./interfaces/IProductService";

@injectable()
export class ProductService implements IProductService {}
