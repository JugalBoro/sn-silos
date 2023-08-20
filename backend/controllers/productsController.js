// Import the Product model to interact with product data in the database
const Product = require("../models/ProductModel");
// Import the express-async-handler middleware to handle asynchronous errors in Express routes
const asyncHandler = require("express-async-handler");

// Handler to get all products
const getProducts = asyncHandler(async (req, res) => {
  // Retrieve all products from the database
  const products = await Product.find({});
  // Respond with the retrieved products
  res.json(products);
});

// Handler to get a specific product by its ID
const getProduct = asyncHandler(async (req, res) => {
  // Find a product by its ID
  const product = await Product.findById(req.params.id);
  // If the product is found, respond with the product; otherwise, return a 404 error
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

// Handler to delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  // Find a product by its ID
  const product = await Product.findById(req.params.id);
  // If the product is found, delete it and respond with a success message; otherwise, return a 404 error
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Handler to update a product
const updateProduct = asyncHandler(async (req, res) => {
  // Destructure relevant data from the request body
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  // Find a product by its ID
  const product = await Product.findById(req.params.id);
  // If the product is found, update its properties and respond with the updated product; otherwise, return a 404 error
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Handler to create a new product
const createProduct = asyncHandler(async (req, res) => {
  // Destructure relevant data from the request body
  const { name, description, price, countInStock } = req.body;
  // Create a new product using the provided data
  const product = await Product.create({
    name,
    description,
    price,
    countInStock,
  });
  // If the product is successfully created, respond with the created product; otherwise, return a 404 error
  if (product) {
    res.status(201).json({
      name: product.name,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Export the handlers for use in other parts of the application
module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
