const User = require("../../mongoDb/models/User");

// Create user
const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

// Get all users
const getAllUsers = async () => {
  return await User.find();
};

// Get single user
const getUserById = async (id) => {
  return await User.findById(id);
};

// Update user
const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// Delete user
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
