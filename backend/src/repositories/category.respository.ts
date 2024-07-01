import { injectable } from "inversify";
import { ICategoryRepository } from "./interfaces/ICategoryRepository";

@injectable()
export class CategoryRepository implements ICategoryRepository {}
