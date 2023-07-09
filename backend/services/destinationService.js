const Destination = require('../models/Destination');

// Get all destinations
exports.getAllDestinations = async () => {
  return await Destination.find();
};

// Create a new destination
exports.createDestination = async ({ name, location, description }) => {
  const newDestination = new Destination({ name, location, description });
  return await newDestination.save();
};

// Get destination by ID
exports.getDestinationById = async (destinationId) => {
  return await Destination.findById(destinationId);
};

// Update destination by ID
exports.updateDestinationById = async (destinationId, updates) => {
  return await Destination.findByIdAndUpdate(destinationId, updates, { new: true });
};

// Delete destination by ID
exports.deleteDestinationById = async (destinationId) => {
  return await Destination.findByIdAndDelete(destinationId);
};
