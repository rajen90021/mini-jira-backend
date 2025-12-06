const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { protect, protectManager } = require('../middleware/authMiddleware');

router.get('/all', protect, getProjects);
router.get('/get', protect, getProjectById);
router.post('/create', protect, protectManager, createProject);
router.put('/update', protect, protectManager, updateProject);
router.delete('/delete', protect, protectManager, deleteProject);

module.exports = router;
