const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// GET /api/flights
router.get('/', flightController.getAllFlights);

// POST /api/flights
router.post('/', flightController.createFlight);

// GET /api/flights/:id
router.get('/:id', flightController.getFlightById);

// PUT /api/flights/:id
router.put('/:id', flightController.updateFlightById);

// DELETE /api/flights/:id
router.delete('/:id', flightController.deleteFlightById);

module.exports = router;
