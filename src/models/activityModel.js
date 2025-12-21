const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    action: {
        type: String, // 'created', 'updated', 'deleted', 'status_changed', 'commented', etc.
        required: true,
    },
    entityType: {
        type: String, // 'Ticket', 'Project'
        required: true,
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'entityType'
    },
    entityName: {
        type: String,
        required: false
    },
    details: {
        type: String,
        required: false
    },
    metadata: {
        type: Map,
        of: String,
        required: false
    }
}, {
    timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
