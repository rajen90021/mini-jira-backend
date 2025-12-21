const express = require('express');
const router = express.Router();
const { logTime, getTicketLogs } = require('../controllers/timeTrackingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/log', protect, logTime);
router.get('/:ticketId', protect, getTicketLogs);

module.exports = router;
