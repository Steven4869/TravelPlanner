const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  return await newUser.save();
};

// Get user by ID
exports.getUserById = async (userId) => {
  return await User.findById(userId);
};

// Get user by email
exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
