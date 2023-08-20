// Import the express-async-handler middleware to handle asynchronous errors in Express routes
const asyncHandler = require("express-async-handler");

// Import the Order model to interact with the Order data in the database
const Order = require("../models/OrderModel");

// Handler to add a new order item
const addOrderItem = asyncHandler(async (req, res) => {
  // Destructure relevant data from the request body
  const { orderItems, itemsPrice, totalPrice } = req.body;

  // Check if there are order items, and if not, return an error
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items Found");
  } else {
    // Create a new order with the provided data
    const order = new Order({
      orderItems,
      user: req.user._id,
      itemsPrice,
      totalPrice,
    });

    // Save the new order in the database
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// Handler to get an order by its ID
const getOrderById = asyncHandler(async (req, res) => {
  // Find the order by its ID and populate user information
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  // If the order is found, return it; otherwise, return a 404 error
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// Handler to delete an order from the cart
const deleteFromCart = asyncHandler(async (req, res) => {
  // Find the order by its ID
  const order = await Order.findById(req.params.id);

  // If the order is found, update its payment status, payment result, and delete it
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
    };
    const updatedOrder = await order.delete();
    res.json(updatedOrder);
  } else {
    // If the order is not found, return a 404 error
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// Handler to get orders belonging to the current user
const getMyOrders = asyncHandler(async (req, res) => {
  // Find orders that belong to the user
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Export the handlers for use in other parts of the application
module.exports = { addOrderItem, getOrderById, deleteFromCart, getMyOrders };
