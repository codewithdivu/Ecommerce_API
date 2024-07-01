import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    const cartt = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.product",
        },
      },
      { $unwind: "$items.product" },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          items: {
            $push: {
              _id: "$items.product._id",
              quantity: "$items.quantity",
              name: "$items.product.name",
              description: "$items.product.description",
              price: "$items.product.price",
              category: "$items.product.category",
              inStock: "$items.product.inStock",
              tags: "$items.product.tags",
              images: "$items.product.images",
              createdAt: "$items.product.createdAt",
              updatedAt: "$items.product.updatedAt",
            },
          },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      msg: "Product added to cart",
      data: cartt[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to add product to cart",
      error: error.message,
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const cartt = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.product",
        },
      },
      { $unwind: "$items.product" },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          items: {
            $push: {
              _id: "$items.product._id",
              quantity: "$items.quantity",
              name: "$items.product.name",
              description: "$items.product.description",
              price: "$items.product.price",
              category: "$items.product.category",
              inStock: "$items.product.inStock",
              tags: "$items.product.tags",
              images: "$items.product.images",
              createdAt: "$items.product.createdAt",
              updatedAt: "$items.product.updatedAt",
            },
          },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      msg: "Product removed from cart",
      data: cartt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to remove product from cart",
      error: error.message,
    });
  }
};

// Get cart items
const getCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.product",
        },
      },
      { $unwind: "$items.product" },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          items: {
            $push: {
              _id: "$items.product._id",
              quantity: "$items.quantity",
              name: "$items.product.name",
              description: "$items.product.description",
              price: "$items.product.price",
              category: "$items.product.category",
              inStock: "$items.product.inStock",
              tags: "$items.product.tags",
              images: "$items.product.images",
              createdAt: "$items.product.createdAt",
              updatedAt: "$items.product.updatedAt",
            },
          },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);
    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Cart retrieved successfully",
      data: cart[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve cart",
      error: error.message,
    });
  }
};

// Increment quantity of a cart item
const incrementCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
      await cart.save();
      res.status(200).json({
        success: true,
        msg: "Cart item quantity incremented",
        data: cart,
      });
    } else {
      res
        .status(404)
        .json({ success: false, msg: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to increment cart item quantity",
      error: error.message,
    });
  }
};

// Decrement quantity of a cart item
const decrementCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
        await cart.save();
        res.status(200).json({
          success: true,
          msg: "Cart item quantity decremented",
          data: cart,
        });
      } else {
        res
          .status(400)
          .json({ success: false, msg: "Quantity cannot be less than 1" });
      }
    } else {
      res
        .status(404)
        .json({ success: false, msg: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to decrement cart item quantity",
      error: error.message,
    });
  }
};

// Empty cart
const emptyCart = async (req, res) => {
  try {
    const userId = req.user;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      msg: "Cart emptied successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to empty cart",
      error: error.message,
    });
  }
};

export {
  addToCart,
  removeFromCart,
  getCart,
  emptyCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
};
