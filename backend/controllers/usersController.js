// Import the User model to interact with user data in the database
const User = require("../models/UserModel");
// Import the express-async-handler middleware to handle asynchronous errors in Express routes
const asyncHandler = require("express-async-handler");
// Import the utility function to generate JWT tokens
const generateToken = require("../utils/generateToken");

// Handler to register a new user
const registerUser = asyncHandler(async (req, res) => {
  // Destructure relevant data from the request body
  const { name, email, password } = req.body;

  // Check if a user with the provided email already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  // Create a new user using the provided data
  const user = await User.create({ name, email, password });
  if (user) {
    // Respond with the created user's data along with a generated JWT token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Handler to authenticate a user
const authController = asyncHandler(async (req, res) => {
  // Destructure relevant data from the request body
  const { email, password } = req.body;

  // Find a user by their email
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // Respond with the authenticated user's data along with a generated JWT token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// Handler to get the user's profile
const getUserProfile = asyncHandler(async (req, res) => {
  // Find the user's profile by their user ID
  const user = await User.findById(req.user._id);
  if (user) {
    // Respond with the user's profile data
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Handler to update the user's profile
const updateUserProfile = asyncHandler(async (req, res) => {
  // Find the user by their user ID
  const user = await User.findById(req.user._id);
  if (user) {
    // Update user's profile data with the provided data
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    // Save the updated user's profile data
    const updateUser = await user.save();
    // Respond with the updated user's profile data along with a generated JWT token
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

// Export the handlers for use in other parts of the application
module.exports = {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
};
