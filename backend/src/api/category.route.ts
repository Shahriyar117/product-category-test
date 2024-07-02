import container from "../depInjContainer";
import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { INTERFACE_TYPE } from "../utils/appConstant";

const router = Router();

const categoryController = container.get<CategoryController>(
  INTERFACE_TYPE.CategoryController
);

router.get("/", categoryController.getAllCategories.bind(categoryController));

export default router;
