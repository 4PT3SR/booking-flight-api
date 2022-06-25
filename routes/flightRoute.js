const express = require('express');
const router = express.Router();
const controller = require('../controllers/flightController');

router.post('/addflight', controller.addFlight)
router.get('/flights',controller.flights)
module.exports = router;

