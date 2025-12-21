const Activity = require('../models/activityModel');

const logActivity = async (userId, action, entityType, entityId, entityName, details, metadata = {}) => {
    try {
        await Activity.create({
            userId,
            action,
            entityType,
            entityId,
            entityName,
            details,
            metadata
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};

module.exports = { logActivity };
