const express = require('express');
const router = express.Router();
const { chat, refineDescription } = require('../controllers/aiController');

// All routes are mounted under /api/ai
router.post('/chat', chat);
router.post('/refine-description', refineDescription);

module.exports = router;
