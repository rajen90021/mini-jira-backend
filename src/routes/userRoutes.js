const express = require('express');
const router = express.Router();
const {
    getUsers,
    updateUser,
} = require('../controllers/userController');
const {
    registerUser,
    loginUser,
} = require('../controllers/authController');
const { protect, protectManager } = require('../middleware/authMiddleware');

router.get('/all', protect, getUsers);
router.post('/create', protect, protectManager, registerUser);
router.put('/update', protect, protectManager, updateUser);
router.post('/login', loginUser);

module.exports = router;
