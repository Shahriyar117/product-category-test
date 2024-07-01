import { injectable } from "inversify";
import { ICategoryService } from "./interfaces/ICategoryService";

@injectable()
export class CategoryService implements ICategoryService {}
