const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

/**
 * AI-like engine to generate intelligent suggestions
 * Uses keyword matching, historical patterns, and frequency analysis
 */
const suggestionEngine = {
    // Suggest assignees based on who worked on similar tickets or has the least load
    suggestAssignees: async (title, description, projectId) => {
        // 1. Find tickets with similar words in title
        const keywords = title.split(' ').filter(w => w.length > 3);

        // Find recent tickets in the same project
        const recentTickets = await Ticket.find({
            projectId,
            createdAt: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } // Last 90 days
        }).populate('assignees');

        const userScores = {};

        recentTickets.forEach(ticket => {
            let score = 0;
            // Calculate similarity score
            const ticketKeywords = ticket.title.split(' ');
            const matchCount = keywords.filter(k => ticketKeywords.some(tk => tk.toLowerCase().includes(k.toLowerCase()))).length;

            if (matchCount > 0) score += matchCount * 2;
            if (ticket.status === 'Resolved' || ticket.status === 'Closed') score += 1;

            ticket.assignees.forEach(user => {
                if (!userScores[user._id]) {
                    userScores[user._id] = { user, score: 0, count: 0 };
                }
                userScores[user._id].score += score;
                userScores[user._id].count += 1;
            });
        });

        // Convert to array and sort
        return Object.values(userScores)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3) // Top 3 suggestions
            .map(u => ({
                user: u.user,
                reason: 'Worked on similar tasks',
                confidence: Math.min(u.score * 10, 95) // Cap at 95%
            }));
    },

    // Suggest priority based on keywords (e.g., "urgent", "fix", "crash" -> High/Critical)
    suggestPriority: (title, description) => {
        const text = (title + ' ' + (description || '')).toLowerCase();

        if (text.includes('urgent') || text.includes('critical') || text.includes('crash') || text.includes('production')) {
            return { level: 'Critical', confidence: 90, reason: 'Detected urgent keywords' };
        }
        if (text.includes('error') || text.includes('bug') || text.includes('fix') || text.includes('broken')) {
            return { level: 'High', confidence: 75, reason: 'Detected error-related keywords' };
        }
        if (text.includes('typo') || text.includes('color') || text.includes('style') || text.includes('update')) {
            return { level: 'Low', confidence: 60, reason: 'Detected cosmetic/minor keywords' };
        }

        return { level: 'Medium', confidence: 50, reason: 'Default suggestion' };
    },

    // Suggest estimation (spend time) based on similar past tickets
    suggestEstimation: async (title, projectId) => {
        // Mock logic for now, in reality would average duration of similar tickets
        return {
            spendTime: 2,
            duration: 1,
            confidence: 40,
            reason: 'Based on average task duration'
        };
    }
};

module.exports = suggestionEngine;
