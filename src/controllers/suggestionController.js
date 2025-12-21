const suggestionEngine = require('../utils/suggestionEngine');

// @desc    Get AI suggestions for a new ticket
// @route   POST /api/suggestions/analyze
// @access  Private
const analyzeTicket = async (req, res) => {
    try {
        const { title, description, projectId } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required for analysis' });
        }

        const promises = [
            suggestionEngine.suggestPriority(title, description),
            suggestionEngine.suggestEstimation(title, projectId)
        ];

        if (projectId) {
            promises.push(suggestionEngine.suggestAssignees(title, description, projectId));
        }

        const results = await Promise.all(promises);

        // Map results back correctly
        const prioritySuggestion = results[0];
        const estimationSuggestion = results[1];
        const assigneeSuggestions = projectId ? results[2] : [];

        res.status(200).json({
            assignees: assigneeSuggestions,
            priority: prioritySuggestion,
            estimation: estimationSuggestion
        });
    } catch (error) {
        console.error('Suggestion Engine Error:', error);
        res.status(500).json({ message: 'AI Analysis failed' });
    }
};

module.exports = { analyzeTicket };
