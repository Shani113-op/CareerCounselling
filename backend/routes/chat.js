const express = require('express');
const { openai, SYSTEM_PROMPT } = require('../config/openai');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// In-memory conversation storage (replace with database in production)
const conversations = new Map();

// Get chat limits based on plan
const getChatLimits = (plan) => {
    switch (plan) {
        case 'free': return 30;
        case 'monthly': return 1000;
        case 'quarterly': return 3000;
        default: return 30;
    }
};

// Chat endpoint
router.post('/message', authMiddleware, async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.userId;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Find user (in production, get from database)
        const users = require('./auth').users || [];
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check chat limits
        const chatLimit = getChatLimits(user.plan);
        if (user.chatCount >= chatLimit) {
            return res.status(429).json({ 
                error: 'Chat limit reached',
                chatCount: user.chatCount,
                chatLimit,
                plan: user.plan,
                upgradeRequired: true
            });
        }

        // Get or create conversation history
        if (!conversations.has(userId)) {
            conversations.set(userId, []);
        }
        const conversationHistory = conversations.get(userId);

        // Prepare messages for OpenAI
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-10), // Keep last 10 messages for context
            { role: 'user', content: message }
        ];

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 500,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        });

        const aiResponse = completion.choices[0]?.message?.content;
        if (!aiResponse) {
            throw new Error('No response from OpenAI');
        }

        // Update conversation history
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse }
        );

        // Update user chat count
        user.chatCount += 1;

        res.json({
            response: aiResponse,
            chatCount: user.chatCount,
            chatLimit: getChatLimits(user.plan),
            plan: user.plan
        });

    } catch (error) {
        console.error('Chat error:', error);
        
        // Handle specific OpenAI errors
        if (error.code === 'insufficient_quota') {
            return res.status(429).json({ 
                error: 'API quota exceeded. Please try again later.',
                type: 'quota_exceeded'
            });
        } else if (error.code === 'rate_limit_exceeded') {
            return res.status(429).json({ 
                error: 'Rate limit exceeded. Please wait a moment and try again.',
                type: 'rate_limit'
            });
        } else if (error.code === 'invalid_api_key') {
            return res.status(401).json({ 
                error: 'Invalid API key configuration.',
                type: 'invalid_key'
            });
        }

        res.status(500).json({ 
            error: 'Failed to get AI response. Please try again.',
            type: 'general_error'
        });
    }
});

// Clear conversation
router.delete('/conversation', authMiddleware, (req, res) => {
    const userId = req.user.userId;
    conversations.delete(userId);
    res.json({ message: 'Conversation cleared' });
});

module.exports = router;