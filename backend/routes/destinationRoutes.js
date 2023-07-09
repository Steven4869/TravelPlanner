const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

// GET /api/destinations
router.get('/', destinationController.getAllDestinations);

// POST /api/destinations
router.post('/', destinationController.createDestination);

// GET /api/destinations/:id
router.get('/:id', destinationController.getDestinationById);

// PUT /api/destinations/:id
router.put('/:id', destinationController.updateDestinationById);

// DELETE /api/destinations/:id
router.delete('/:id', destinationController.deleteDestinationById);

module.exports = router;
