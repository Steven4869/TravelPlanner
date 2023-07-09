const Accommodation = require('../models/Accommodation');

// Get all accommodations
exports.getAllAccommodations = async () => {
  return await Accommodation.find();
};

// Create a new accommodation
exports.createAccommodation = async ({ name, location, description }) => {
  const newAccommodation = new Accommodation({ name, location, description });
  return await newAccommodation.save();
};

// Get accommodation by ID
exports.getAccommodationById = async (accommodationId) => {
  return await Accommodation.findById(accommodationId);
};

// Update accommodation by ID
exports.updateAccommodationById = async (accommodationId, updates) => {
  return await Accommodation.findByIdAndUpdate(accommodationId, updates, { new: true });
};

// Delete accommodation by ID
exports.deleteAccommodationById = async (accommodationId) => {
  return await Accommodation.findByIdAndDelete(accommodationId);
};
