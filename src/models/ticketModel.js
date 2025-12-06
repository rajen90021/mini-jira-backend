const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assign: {
        type: String, // Keeping for backward compatibility or display name
        required: false,
    },
    assignees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    // Deprecated: kept for backward compatibility if needed, but prefer assignees
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open',
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium',
    },
    spendTime: {
        type: String,
        required: false,
    },
    duration: {
        type: String,
        required: false,
    },
    remark: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
