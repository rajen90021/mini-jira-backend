const mongoose = require('mongoose');

const timeLogSchema = mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number, // In minutes
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const TimeLog = mongoose.model('TimeLog', timeLogSchema);

module.exports = TimeLog;
