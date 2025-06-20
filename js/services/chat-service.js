class ChatService {
    constructor() {
        this.baseURL = 'http://localhost:3001/api';
        this.conversationHistory = [];
    }

    async sendMessage(message) {
        try {
            if (!authService.isAuthenticated()) {
                throw new Error('Please login to use the chat feature');
            }

            const response = await fetch(`${this.baseURL}/chat/message`, {
                method: 'POST',
                headers: authService.getAuthHeaders(),
                body: JSON.stringify({ message }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update conversation history
                this.conversationHistory.push(
                    { role: 'user', content: message },
                    { role: 'assistant', content: data.response }
                );

                return {
                    success: true,
                    response: data.response,
                    chatCount: data.chatCount,
                    chatLimit: data.chatLimit,
                    plan: data.plan
                };
            } else {
                return {
                    success: false,
                    error: data.error,
                    chatCount: data.chatCount,
                    chatLimit: data.chatLimit,
                    upgradeRequired: data.upgradeRequired
                };
            }
        } catch (error) {
            console.error('Chat error:', error);
            return {
                success: false,
                error: error.message || 'Failed to send message'
            };
        }
    }

    async clearConversation() {
        try {
            if (!authService.isAuthenticated()) {
                return { success: false, error: 'Not authenticated' };
            }

            const response = await fetch(`${this.baseURL}/chat/conversation`, {
                method: 'DELETE',
                headers: authService.getAuthHeaders(),
            });

            if (response.ok) {
                this.conversationHistory = [];
                return { success: true };
            } else {
                return { success: false, error: 'Failed to clear conversation' };
            }
        } catch (error) {
            console.error('Clear conversation error:', error);
            return { success: false, error: 'Network error' };
        }
    }

    getConversationHistory() {
        return this.conversationHistory;
    }
}

// Create global instance
const chatService = new ChatService();

// Export for use in other files
if (typeof window !== 'undefined') {
    window.chatService = chatService;
}