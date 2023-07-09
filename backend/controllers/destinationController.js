const Destination = require('../models/Destination');

// Get all destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json({ message: 'Destinations retrieved successfully', destinations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve destinations', error });
  }
};

// Create a new destination
exports.createDestination = async (req, res) => {
  try {
    const { name, location, description } = req.body;

    const newDestination = new Destination({ name, location, description });
    await newDestination.save();

    res.status(201).json({ message: 'Destination created successfully', destination: newDestination });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create destination', error });
  }
};

// Get a destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({ message: 'Destination retrieved successfully', destination });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve destination', error });
  }
};

// Update a destination by ID
exports.updateDestinationById = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const updates = req.body;

    const updatedDestination = await Destination.findByIdAndUpdate(destinationId, updates, { new: true });

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({ message: 'Destination updated successfully', destination: updatedDestination });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update destination', error });
  }
};

// Delete a destination by ID
exports.deleteDestinationById = async (req, res) => {
  try {
    const destinationId = req.params.id;

    const deletedDestination = await Destination.findByIdAndDelete(destinationId);

    if (!deletedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({ message: 'Destination deleted successfully', destination: deletedDestination });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete destination', error });
  }
};
