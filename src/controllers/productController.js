import Product from "../models/Product.js";

// create product
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await Product.create(productData);
    res.status(201).json({
      success: true,
      msg: "Product created successfully.",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to create product.",
      error: error.message,
    });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productCounts = await Product.countDocuments();
    res.status(200).json({
      success: true,
      msg: "Products retrieved successfully.",
      count: productCounts,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve products.",
      error: error.message,
    });
  }
};

// get product by id
const getProductByID = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Product retrieved successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve product.",
      error: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete product.",
      error: error.message,
    });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const options = { new: true, runValidators: true };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      options
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to update product.",
      error: error.message,
    });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
};
