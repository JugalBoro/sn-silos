// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");
// Import the bcryptjs library for password hashing
const bcrypt = require("bcryptjs");

// Define the user schema for users
const userSchema = mongoose.Schema(
  {
    // Name of the user (required)
    name: {
      type: String,
      required: true,
    },
    // Email address of the user (required)
    email: {
      type: String,
      required: true,
    },
    // Hashed password of the user (required)
    password: {
      type: String,
      required: true,
    },
    // Boolean indicating whether the user has admin privileges (default: false)
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Adds "createdAt" and "updatedAt" timestamps to the document
  }
);

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save middleware to hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  // Check if the password has been modified; if not, proceed to the next middleware
  if (!this.isModified("password")) {
    next();
  }
  // Generate a salt and hash the password with the salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create a Mongoose model named "User" using the defined schema
const User = mongoose.model("User", userSchema);

// Export the "User" model for use in other parts of the application
module.exports = User;
