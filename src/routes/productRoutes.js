import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import isAuthenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.route("/").get(getAllProducts);
ProductRouter.route("/:id")
  .get(getProductByID)
  .delete(isAuthenticatedMiddleware, deleteProduct)
  .patch(isAuthenticatedMiddleware, updateProduct);
ProductRouter.route("/create").post(isAuthenticatedMiddleware, createProduct);

export default ProductRouter;
