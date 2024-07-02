import express from "express";
import { ProductController } from "../controllers/product.controller";
import { INTERFACE_TYPE } from "../utils/appConstant";
import container from "../depInjContainer";
import { IProductService } from "../services/interfaces/IProductService";

const router = express.Router();

export const productService = container.get<IProductService>(
  INTERFACE_TYPE.ProductService
);
const productController = new ProductController(productService);

router.post("/", (req, res) => {});

router.get("/", productController.getAllProducts.bind(productController));

export default router;
