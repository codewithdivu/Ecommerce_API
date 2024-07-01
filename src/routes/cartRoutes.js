import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
  emptyCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} from "../controllers/cartController.js";
import isAuthenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(isAuthenticatedMiddleware, addToCart)
  .get(isAuthenticatedMiddleware, getCart)
  .delete(isAuthenticatedMiddleware, removeFromCart);
// .put(isAuthenticatedMiddleware, updateCartItem)

cartRouter.route("/empty").delete(isAuthenticatedMiddleware, emptyCart);

cartRouter.post(
  "/increment",
  isAuthenticatedMiddleware,
  incrementCartItemQuantity
);
cartRouter.post(
  "/decrement",
  isAuthenticatedMiddleware,
  decrementCartItemQuantity
);

export default cartRouter;
