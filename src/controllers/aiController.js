/**
 * AI Controller for Nebula Neural Engine
 * Handles AI chat and ticket description refinement
 */

// Simulated AI responses based on common project management queries
const chatResponses = [
    {
        keywords: ['hello', 'hi', 'hey', 'who are you'],
        responses: [
            "Hello! I am your Nebula AI Copilot. I'm here to help you manage your projects more efficiently. What can I do for you today?",
            "Greetings. Neural systems are online. How can I assist with your architecture today?",
            "System online. Prepared to help you refine tickets and analyze your workflow."
        ]
    },
    {
        keywords: ['project', 'manage'],
        responses: [
            "To manage a project better, ensure all tickets have clear descriptions and assigned developers. I can help refine those descriptions if you'd like.",
            "I recommend checking the Kanban board for a visual overview of your project's current state.",
            "Efficient project management starts with accurate estimations. I can suggest durations for your tickets based on their titles."
        ]
    },
    {
        keywords: ['developer', 'performance', 'member'],
        responses: [
            "You can view developer details in the Developers section. I can help identify who might be best suited for a specific task.",
            "Currently, the system tracks ticket resolution times to help analyze team velocity.",
            "If you need to assign a ticket, I can suggest the best neural node (developer) based on their historical workload."
        ]
    },
    {
        keywords: ['ticket', 'issue', 'bug'],
        responses: [
            "When creating a ticket, try to be as specific as possible. Use the 'Refine with AI' button to enhance your technical details.",
            "I can analyze ticket titles to automatically suggest priority levels and estimated hours.",
            "Need help classification? Just start typing a ticket title and I'll provide real-time suggestions."
        ]
    }
];

const defaultResponses = [
    "That's an interesting query. I'm currently monitoring your neural matrix for patterns. Can you tell me more?",
    "I'm processing your request across the Nebula network. Could you provide a bit more context?",
    "Understood. I'm here to support your development cycle. What's the next step for this initiative?",
    "Data received. I recommend refining your project parameters to optimize for success."
];

// @desc    Chat with AI Copilot
// @route   POST /api/ai/chat
// @access  Public (or Private if preferred)
const chat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const lowerMsg = message.toLowerCase();
        let reply = "";

        // Simple keyword matching for simulation
        const matched = chatResponses.find(cr =>
            cr.keywords.some(keyword => lowerMsg.includes(keyword))
        );

        if (matched) {
            reply = matched.responses[Math.floor(Math.random() * matched.responses.length)];
        } else {
            reply = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }

        // Simulate network latency for "Neural" feel
        setTimeout(() => {
            res.status(200).json({ reply });
        }, 1000);

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ message: 'Neural connection failed' });
    }
};

// @desc    Refine ticket description using AI
// @route   POST /api/ai/refine-description
// @access  Public
const refineDescription = async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }

        // Professional refinement patterns
        let refinedDescription = description;

        // Simple "AI-fication" simulation
        if (refinedDescription.length < 100) {
            refinedDescription = `OBJECTIVE: ${description}\n\nTECHNICAL SCOPE: Implement a robust solution following industry best practices. Ensure optimal performance and seamless integration with existing architecture.\n\nSUCCESS CRITERIA:\n- Functional verification passed\n- Code quality standards met\n- Zero regression impact`;
        } else {
            refinedDescription = `REFINED SPECIFICATION:\n\n${description}\n\n---\nSYSTEM ANALYSIS: This requirement aligns with the current development roadmap. Recommended approach includes comprehensive unit testing and documentation updates.`;
        }

        setTimeout(() => {
            res.status(200).json({ refinedDescription });
        }, 1500);

    } catch (error) {
        console.error('AI Refinement Error:', error);
        res.status(500).json({ message: 'Description processing failed' });
    }
};

module.exports = {
    chat,
    refineDescription
};
