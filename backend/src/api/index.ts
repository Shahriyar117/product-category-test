import { Router } from "express";
import productRouter from "./product.route";
import categoryRouter from "./category.route";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);

export default router;
