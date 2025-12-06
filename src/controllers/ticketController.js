
const Ticket = require('../models/ticketModel');

// @desc    Get all tickets with optional filtering
// @route   GET /api/tickets/all?assign=&status=&priority=
// @access  Public
const getTickets = async (req, res) => {
    try {
        const { assign, status, priority } = req.query;
        const query = {};

        if (assign) {
            query.assign = assign;
        }
        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }

        const tickets = await Ticket.find(query);
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single ticket
// @route   GET /api/tickets/get?ticketId=
// @access  Public
const getTicketById = async (req, res) => {
    try {
        const ticketId = req.query.ticketId;
        if (!ticketId) {
            return res.status(400).json({ message: 'Ticket ID is required' });
        }
        const ticket = await Ticket.findById(ticketId);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a ticket
// @route   POST /api/tickets/create
// @access  Public
const createTicket = async (req, res) => {
    const {
        projectId,
        title,
        description,
        assign,
        developerId,
        status,
        priority,
        spendTime,
        duration,
        remark,
    } = req.body;

    try {
        const ticket = await Ticket.create({
            projectId,
            title,
            description,
            assign,
            developerId,
            status,
            priority,
            spendTime,
            duration,
            remark,
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a ticket
// @route   PUT /api/tickets/update?ticketId=
// @access  Public
const updateTicket = async (req, res) => {
    try {
        const ticketId = req.query.ticketId;
        if (!ticketId) {
            return res.status(400).json({ message: 'Ticket ID is required' });
        }

        const ticket = await Ticket.findById(ticketId);

        if (ticket) {
            ticket.projectId = req.body.projectId || ticket.projectId;
            ticket.title = req.body.title || ticket.title;
            ticket.description = req.body.description || ticket.description;
            ticket.assign = req.body.assign || ticket.assign;
            ticket.status = req.body.status || ticket.status;
            ticket.priority = req.body.priority || ticket.priority;
            ticket.spendTime = req.body.spendTime || ticket.spendTime;
            ticket.duration = req.body.duration || ticket.duration;
            ticket.remark = req.body.remark || ticket.remark;

            const updatedTicket = await ticket.save();
            res.status(200).json(updatedTicket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a ticket
// @route   DELETE /api/tickets/delete?ticketId=
// @access  Public
const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.query.ticketId;
        if (!ticketId) {
            return res.status(400).json({ message: 'Ticket ID is required' });
        }

        const ticket = await Ticket.findById(ticketId);

        if (ticket) {
            await ticket.deleteOne();
            res.status(200).json({ message: 'Ticket removed' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
};
