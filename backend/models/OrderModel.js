// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Define the order schema for the cart
const orderSchema = mongoose.Schema(
  {
    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Refers to the "User" model
    },
    // Array of order items with details
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product", // Refers to the "Product" model
        },
      },
    ],
    // Total price of the entire order
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps to the document
);

// Create a Mongoose model named "Order" using the defined schema
const Order = mongoose.model("Order", orderSchema);

// Export the "Order" model for use in other parts of the application
module.exports = Order;
