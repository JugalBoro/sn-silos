// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Define the product schema for products
const productSchema = mongoose.Schema(
  {
    // Reference to the user who created the product
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the "User" model
    },
    // Name of the product (required)
    name: {
      type: String,
      required: true,
    },
    // URL to the product image
    image: {
      type: String,
    },
    // Brand of the product
    brand: {
      type: String,
    },
    // Category to which the product belongs
    category: {
      type: String,
    },
    // Description of the product
    description: {
      type: String,
    },
    // Price of the product (default: 0)
    price: {
      type: Number,
      default: 0,
    },
    // Count of the product available in stock (default: 0)
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps to the document
);

// Create a Mongoose model named "Product" using the defined schema
const Product = mongoose.model("Product", productSchema);

// Export the "Product" model for use in other parts of the application
module.exports = Product;
