const express = require('express');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, eventController.createEvent);
router.get('/', authMiddleware, eventController.getEvents);
router.get('/location', authMiddleware, eventController.getLocationCoordinates);

module.exports = router;