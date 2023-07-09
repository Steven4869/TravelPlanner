const Itinerary = require('../models/Itinerary');

// Create a new itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { name, userId, destinations, startDate, endDate } = req.body;

    const newItinerary = new Itinerary({ name, userId, destinations, startDate, endDate });
    await newItinerary.save();

    res.status(201).json({ message: 'Itinerary created successfully', itinerary: newItinerary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create itinerary', error });
  }
};

// Get all itineraries for a user
exports.getAllItineraries = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itineraries = await Itinerary.find({ userId });

    res.status(200).json({ message: 'Itineraries retrieved successfully', itineraries });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve itineraries', error });
  }
};

// Get an itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.status(200).json({ message: 'Itinerary retrieved successfully', itinerary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve itinerary', error });
  }
};

// Update an itinerary by ID
exports.updateItineraryById = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const updates = req.body;

    const updatedItinerary = await Itinerary.findByIdAndUpdate(itineraryId, updates, { new: true });

    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.status(200).json({ message: 'Itinerary updated successfully', itinerary: updatedItinerary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update itinerary', error });
  }
};

// Delete an itinerary by ID
exports.deleteItineraryById = async (req, res) => {
  try {
    const itineraryId = req.params.id;

    const deletedItinerary = await Itinerary.findByIdAndDelete(itineraryId);

    if (!deletedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.status(200).json({ message: 'Itinerary deleted successfully', itinerary: deletedItinerary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete itinerary', error });
  }
};
