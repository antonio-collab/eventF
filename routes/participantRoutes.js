const express = require('express');
const participantController = require('../controllers/participantController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/status', authMiddleware, participantController.updateParticipantStatus);

module.exports = router;