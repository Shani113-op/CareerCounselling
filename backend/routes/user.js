const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, (req, res) => {
    try {
        const userId = req.user.userId;
        
        // Find user (in production, get from database)
        const users = require('./auth').users || [];
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            plan: user.plan,
            chatCount: user.chatCount,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Failed to get profile' });
    }
});

// Update user plan
router.post('/upgrade', authMiddleware, (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.user.userId;

        if (!['monthly', 'quarterly'].includes(plan)) {
            return res.status(400).json({ error: 'Invalid plan' });
        }

        // Find user (in production, update in database)
        const users = require('./auth').users || [];
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user plan
        user.plan = plan;
        user.chatCount = 0; // Reset chat count on upgrade

        res.json({
            message: 'Plan upgraded successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                plan: user.plan,
                chatCount: user.chatCount
            }
        });
    } catch (error) {
        console.error('Upgrade error:', error);
        res.status(500).json({ error: 'Failed to upgrade plan' });
    }
});

module.exports = router;