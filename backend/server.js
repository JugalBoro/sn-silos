// Import the Express framework
const express = require("express");
// Import the custom errorHandler middleware
const { errorHandler } = require("./middlewares/errorMiddleware");
// Import the products data
const products = require("./data/products");
// Import the dotenv library to load environment variables
const dotenv = require("dotenv");
// Import the database connection function
const connectDb = require("./config/config");
// Import the routes for different API endpoints
const productRoutes = require("./routes/productsRoute");
const usersRoutes = require("./routes/UsersRoute");
const orderRoutes = require("./routes/orderRoute");
// Import bonus task routes (commented out)
// const bonusTaskRoutes = require("./routes/bonusTasksRoutes");

// Load environment variables from a .env file
dotenv.config();

// Establish a connection to the MongoDB database
connectDb();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Default route to display a welcome message
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Node Server</h1>");
});

// Route handling for product-related API endpoints
app.use("/api", productRoutes);

// Route handling for user-related API endpoints
app.use("/api/users", usersRoutes);

// Route handling for order-related API endpoints
app.use("/api/orders", orderRoutes);

// Route handling for bonus task-related API endpoints (commented out)
// app.use("/api/search", bonusTaskRoutes);

// Apply the custom errorHandler middleware to handle errors
app.use(errorHandler);

// Define the port on which the server will listen
const PORT = 8080;

// Start the server and listen on the specified port
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`
      .inverse
  );
});
