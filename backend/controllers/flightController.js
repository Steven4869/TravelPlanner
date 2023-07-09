const Flight = require('../models/Flight');

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({ message: 'Flights retrieved successfully', flights });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve flights', error });
  }
};

// Create a new flight
exports.createFlight = async (req, res) => {
  try {
    const { airline, origin, destination, departureTime, arrivalTime } = req.body;

    const newFlight = new Flight({ airline, origin, destination, departureTime, arrivalTime });
    await newFlight.save();

    res.status(201).json({ message: 'Flight created successfully', flight: newFlight });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create flight', error });
  }
};

// Get a flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const flightId = req.params.id;
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight retrieved successfully', flight });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve flight', error });
  }
};

// Update a flight by ID
exports.updateFlightById = async (req, res) => {
  try {
    const flightId = req.params.id;
    const updates = req.body;

    const updatedFlight = await Flight.findByIdAndUpdate(flightId, updates, { new: true });

    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight updated successfully', flight: updatedFlight });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flight', error });
  }
};

// Delete a flight by ID
exports.deleteFlightById = async (req, res) => {
  try {
    const flightId = req.params.id;

    const deletedFlight = await Flight.findByIdAndDelete(flightId);

    if (!deletedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight deleted successfully', flight: deletedFlight });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flight', error });
  }
};
