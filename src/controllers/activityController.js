const Activity = require('../models/activityModel');

// @desc    Get recent activities
// @route   GET /api/activities
// @access  Public (or Protected)
const getActivities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await Activity.countDocuments();
        const activities = await Activity.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            activities,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getActivities
};
