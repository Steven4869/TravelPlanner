const Itinerary = require('../models/Itinerary');

// Create a new itinerary
exports.createItinerary = async ({ name, userId, destinations, startDate, endDate }) => {
  const newItinerary = new Itinerary({ name, userId, destinations, startDate, endDate });
  return await newItinerary.save();
};

// Get all itineraries for a user
exports.getAllItinerariesForUser = async (userId) => {
  return await Itinerary.find({ userId });
};

// Get itinerary by ID
exports.getItineraryById = async (itineraryId) => {
  return await Itinerary.findById(itineraryId);
};

// Update itinerary by ID
exports.updateItineraryById = async (itineraryId, updates) => {
  return await Itinerary.findByIdAndUpdate(itineraryId, updates, { new: true });
};

// Delete itinerary by ID
exports.deleteItineraryById = async (itineraryId) => {
  return await Itinerary.findByIdAndDelete(itineraryId);
};
