const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Completed', 'On Hold', 'Archived'],
        default: 'Active',
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
