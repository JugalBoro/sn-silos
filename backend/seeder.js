// Import required libraries and modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");

// Import sample data for users and products
const users = require("./data/users");
const products = require("./data/products");

// Import User, Product, and Order models
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const Order = require("./models/OrderModel");

// Import the database connection function
const connectDb = require("./config/config");

// Load environment variables from a .env file
dotenv.config();

// Establish a connection to the database
connectDb();

// Function to import data from sample data files
const importData = async () => {
  try {
    // Delete existing data from collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert sample user data into the User collection
    const createUser = await User.insertMany(users);
    // Get the ID of the first created admin user
    const adminUser = createUser[0]._id;

    // Modify sample product data to include the admin user's ID
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert modified sample product data into the Product collection
    await Product.insertMany(sampleData);

    console.log("Data Imported!!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Function to delete all data from collections
const dataDestory = async () => {
  try {
    // Delete all documents from the Order, Product, and User collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check if the script is run with the "-d" flag to delete data
if (process.argv[2] === "-d") {
  // Call the dataDestory function
  dataDestory();
} else {
  // Otherwise, import data by calling the importData function
  importData();
}
