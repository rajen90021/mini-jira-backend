const TimeLog = require('../models/timeLogModel');
const Ticket = require('../models/ticketModel');
const { logActivity } = require('../utils/activityLogger');

// @desc    Log time manually
// @route   POST /api/time-logs/log
// @access  Private
const logTime = async (req, res) => {
    try {
        const { ticketId, duration, description, date } = req.body;
        // duration in minutes

        const timeLog = await TimeLog.create({
            ticketId,
            userId: req.user._id,
            duration: Number(duration),
            description,
            startTime: date ? new Date(date) : new Date(),
            endTime: date ? new Date(new Date(date).getTime() + duration * 60000) : new Date()
        });

        // Update total spend time on ticket
        const ticket = await Ticket.findById(ticketId);
        if (ticket) {
            ticket.spendTime = (ticket.spendTime || 0) + (Number(duration) / 60); // Convert to hours for ticket model if it uses hours
            await ticket.save();

            await logActivity(
                req.user._id,
                'time_logged',
                'Ticket',
                ticket._id,
                ticket.title,
                `Logged ${duration} minutes`
            );
        }

        res.status(201).json(timeLog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logs for a ticket
// @route   GET /api/time-logs/:ticketId
// @access  Private
const getTicketLogs = async (req, res) => {
    try {
        const logs = await TimeLog.find({ ticketId: req.params.ticketId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    logTime,
    getTicketLogs
};
