import { Container } from "inversify";
import { ProductService } from "./services/product.service";
import { ProductRepository } from "./repositories/product.repository";
import { ProductController } from "./controllers/product.controller";
import { CategoryService } from "./services/category.service";
import { CategoryController } from "./controllers/category.controller";
import { CategoryRepository } from "./repositories/category.respository";
import { IProductRepository } from "./repositories/interfaces/IProductRepository";
import { IProductService } from "./services/interfaces/IProductService";
import { ICategoryRepository } from "./repositories/interfaces/ICategoryRepository";
import { ICategoryService } from "./services/interfaces/ICategoryService";
import { INTERFACE_TYPE } from "./utils/appConstant";

const container = new Container();

//Repository
container
  .bind<IProductRepository>(INTERFACE_TYPE.ProductRepository)
  .to(ProductRepository);
container
  .bind<ICategoryRepository>(INTERFACE_TYPE.CategoryRepository)
  .to(CategoryRepository);

//Service
container
  .bind<IProductService>(INTERFACE_TYPE.ProductService)
  .to(ProductService);
container
  .bind<ICategoryService>(INTERFACE_TYPE.CategoryService)
  .to(CategoryService);

//Controller
container.bind(INTERFACE_TYPE.ProductController).to(ProductController);
container.bind(INTERFACE_TYPE.CategoryController).to(CategoryController);

export default container;
