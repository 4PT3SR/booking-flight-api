const express = require('express');
const router = express.Router();
const controller = require('../controllers/flightController');


router.get('/', controller.docs);
router.post('/addflight', controller.addFlight);
router.get('/flights',controller.flight);
router.get('/flights/:id',controller.singleFlight);
router.patch('/flights/:id',controller.editFlight);
router.delete('/flights/:id',controller.deleteFlight);


module.exports = router;

