const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');

// GET /api/accommodations
router.get('/', accommodationController.getAllAccommodations);

// POST /api/accommodations
router.post('/', accommodationController.createAccommodation);

// GET /api/accommodations/:id
router.get('/:id', accommodationController.getAccommodationById);

// PUT /api/accommodations/:id
router.put('/:id', accommodationController.updateAccommodationById);

// DELETE /api/accommodations/:id
router.delete('/:id', accommodationController.deleteAccommodationById);

module.exports = router;
