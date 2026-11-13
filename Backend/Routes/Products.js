
import express from "express";

import {
    GetProducts,
    AddProduct,
    DeleteProduct
} from "../controllers/ProductsController.js";

import { uploadProduct } from "../Middelware/upload.js";

const router = express.Router();

router.get("/", GetProducts);

router.post(
    "/",
    uploadProduct.single("image"),
    AddProduct
);

router.delete("/:id", DeleteProduct);

export default router;
