import express from "express";
import { ProductController } from "../controllers/product.controller";
import { INTERFACE_TYPE } from "../utils/appConstant";
import container from "../depInjContainer";
import { IProductService } from "../services/interfaces/IProductService";
import {
  setUploadPath,
  uploadValidation,
} from "../middlewares/validations/upload.validation";
import { upload } from "../config/multerConfig";
import { createProductValidation } from "../middlewares/validations/product.validation";

const router = express.Router();

export const productService = container.get<IProductService>(
  INTERFACE_TYPE.ProductService
);
const productController = new ProductController(productService);

router.post(
  "/",
  setUploadPath("./public/images/products"),
  upload.single("image"),
  uploadValidation,
  createProductValidation,
  productController.createProduct.bind(productController)
);

router.get("/", productController.getAllProducts.bind(productController));

export default router;
