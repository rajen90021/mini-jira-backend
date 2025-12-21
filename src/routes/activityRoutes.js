const express = require('express');
const router = express.Router();
const { getActivities } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getActivities); // Changed to / (root) since app.js mounts at /api/activities

module.exports = router;
