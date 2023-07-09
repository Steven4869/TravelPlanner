const Accommodation = require('../models/Accommodation');

// Get all accommodations
exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.status(200).json({ message: 'Accommodations retrieved successfully', accommodations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve accommodations', error });
  }
};

// Create a new accommodation
exports.createAccommodation = async (req, res) => {
  try {
    const { name, location, description } = req.body;

    const newAccommodation = new Accommodation({ name, location, description });
    await newAccommodation.save();

    res.status(201).json({ message: 'Accommodation created successfully', accommodation: newAccommodation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create accommodation', error });
  }
};

// Get an accommodation by ID
exports.getAccommodationById = async (req, res) => {
  try {
    const accommodationId = req.params.id;
    const accommodation = await Accommodation.findById(accommodationId);

    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    res.status(200).json({ message: 'Accommodation retrieved successfully', accommodation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve accommodation', error });
  }
};

// Update an accommodation by ID
exports.updateAccommodationById = async (req, res) => {
  try {
    const accommodationId = req.params.id;
    const updates = req.body;

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(accommodationId, updates, { new: true });

    if (!updatedAccommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    res.status(200).json({ message: 'Accommodation updated successfully', accommodation: updatedAccommodation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update accommodation', error });
  }
};

// Delete an accommodation by ID
exports.deleteAccommodationById = async (req, res) => {
  try {
    const accommodationId = req.params.id;

    const deletedAccommodation = await Accommodation.findByIdAndDelete(accommodationId);

    if (!deletedAccommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    res.status(200).json({ message: 'Accommodation deleted successfully', accommodation: deletedAccommodation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete accommodation', error });
  }
};
