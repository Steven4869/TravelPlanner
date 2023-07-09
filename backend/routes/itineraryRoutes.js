const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// GET /api/itineraries
router.get('/', itineraryController.getAllItineraries);

// POST /api/itineraries
router.post('/', itineraryController.createItinerary);

// GET /api/itineraries/:id
router.get('/:id', itineraryController.getItineraryById);

// PUT /api/itineraries/:id
router.put('/:id', itineraryController.updateItineraryById);

// DELETE /api/itineraries/:id
router.delete('/:id', itineraryController.deleteItineraryById);

module.exports = router;
