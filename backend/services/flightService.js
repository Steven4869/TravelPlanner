const Flight = require('../models/Flight');

// Get all flights
exports.getAllFlights = async () => {
  return await Flight.find();
};

// Create a new flight
exports.createFlight = async ({ airline, origin, destination, departureTime, arrivalTime }) => {
  const newFlight = new Flight({ airline, origin, destination, departureTime, arrivalTime });
  return await newFlight.save();
};

// Get flight by ID
exports.getFlightById = async (flightId) => {
  return await Flight.findById(flightId);
};

// Update flight by ID
exports.updateFlightById = async (flightId, updates) => {
  return await Flight.findByIdAndUpdate(flightId, updates, { new: true });
};

// Delete flight by ID
exports.deleteFlightById = async (flightId) => {
  return await Flight.findByIdAndDelete(flightId);
};
