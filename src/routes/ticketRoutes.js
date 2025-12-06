const express = require('express');
const router = express.Router();
const {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.get('/all', protect, getTickets);
router.get('/get', protect, getTicketById);
router.post('/create', protect, createTicket);
router.put('/update', protect, updateTicket);
router.delete('/delete', protect, deleteTicket);

module.exports = router;
