// OpenAI API Service for Career Dendrogram
class OpenAIService {
    constructor() {
        this.apiKey = this.getApiKey();
        this.model = 'gpt-3.5-turbo';
        this.baseURL = 'https://api.openai.com/v1';
        this.conversationHistory = [];
        
        this.systemPrompt = `You are an AI career counselor and guidance expert for "Career Dendrogram", a platform that helps students and professionals discover their ideal career paths. Your role is to provide personalized, practical, and encouraging career advice.

Key responsibilities:
- Help users explore career options based on their interests, skills, and academic background
- Provide information about education requirements, salary ranges, and career growth prospects
- Suggest relevant colleges, entrance exams, and skill development paths
- Offer guidance on career transitions and professional development
- Focus primarily on careers available in India, but also include global opportunities

Guidelines:
- Be encouraging and supportive while being realistic about career prospects
- Provide specific, actionable advice rather than generic responses
- Include salary ranges in Indian Rupees (₹) when discussing compensation
- Mention relevant entrance exams, colleges, and certification programs
- Ask follow-up questions to better understand the user's situation
- Keep responses concise but comprehensive (aim for 2-4 paragraphs)
- Use a friendly, professional tone that's accessible to students and young professionals

Always prioritize the user's interests and aptitudes while providing practical career guidance.`;
    }

    getApiKey() {
        // In a production environment, you should get this from your backend
        // For demo purposes, we'll check localStorage or prompt user
        let apiKey = localStorage.getItem('openai_api_key');
        
        if (!apiKey) {
            // Show API key setup modal
            this.showApiKeySetup();
            return null;
        }
        
        return apiKey;
    }

    showApiKeySetup() {
        const modal = document.createElement('div');
        modal.className = 'api-key-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h3>OpenAI API Key Required</h3>
                    <p>To use the AI chat feature, please enter your OpenAI API key:</p>
                    <div class="api-key-form">
                        <input type="password" id="api-key-input" placeholder="sk-..." />
                        <div class="modal-actions">
                            <button id="save-api-key" class="btn-primary">Save & Continue</button>
                            <button id="skip-api-key" class="btn-secondary">Skip (Use Demo Mode)</button>
                        </div>
                    </div>
                    <p class="api-key-note">
                        <small>Your API key is stored locally and never sent to our servers. 
                        Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a>.</small>
                    </p>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .api-key-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            
            .modal-content {
                background: var(--bg-white);
                border-radius: var(--border-radius);
                padding: 2rem;
                max-width: 500px;
                width: 100%;
                box-shadow: var(--shadow-lg);
            }
            
            .modal-content h3 {
                margin-bottom: 1rem;
                color: var(--text-dark);
            }
            
            .modal-content p {
                margin-bottom: 1.5rem;
                color: var(--text-medium);
            }
            
            .api-key-form input {
                width: 100%;
                padding: 1rem;
                border: 1px solid var(--border-light);
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
                font-size: 1rem;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .modal-actions button {
                flex: 1;
            }
            
            .api-key-note {
                font-size: 0.9rem;
                color: var(--text-light);
                margin: 0;
            }
            
            .api-key-note a {
                color: var(--primary-blue);
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Handle save API key
        $('#save-api-key').addEventListener('click', () => {
            const apiKey = $('#api-key-input').value.trim();
            if (apiKey && apiKey.startsWith('sk-')) {
                localStorage.setItem('openai_api_key', apiKey);
                this.apiKey = apiKey;
                document.body.removeChild(modal);
                document.head.removeChild(style);
                showNotification('API key saved successfully! You can now use AI chat.', 'success');
            } else {
                showNotification('Please enter a valid OpenAI API key (starts with sk-)', 'warning');
            }
        });

        // Handle skip
        $('#skip-api-key').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            showNotification('Using demo mode. AI responses will be simulated.', 'info');
        });

        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
    }

    async getChatResponse(userMessage) {
        try {
            // If no API key, use fallback responses
            if (!this.apiKey) {
                return this.getFallbackResponse(userMessage);
            }

            // Add user message to conversation history
            this.conversationHistory.push({
                role: 'user',
                content: userMessage
            });

            // Prepare messages for API
            const messages = [
                { role: 'system', content: this.systemPrompt },
                ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
            ];

            // Make API call
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    max_tokens: 500,
                    temperature: 0.7,
                    presence_penalty: 0.1,
                    frequency_penalty: 0.1
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content;

            if (!aiResponse) {
                throw new Error('No response received from OpenAI');
            }

            // Add AI response to conversation history
            this.conversationHistory.push({
                role: 'assistant',
                content: aiResponse
            });

            return aiResponse.trim();

        } catch (error) {
            console.error('OpenAI API Error:', error);
            return this.handleApiError(error);
        }
    }

    handleApiError(error) {
        if (error.message.includes('API key')) {
            // Clear invalid API key
            localStorage.removeItem('openai_api_key');
            this.apiKey = null;
            return "It seems there's an issue with the API key. Please refresh the page to set up a new one, or continue in demo mode.";
        } else if (error.message.includes('quota') || error.message.includes('billing')) {
            return "I'm temporarily unavailable due to API usage limits. Please try again later or contact support.";
        } else if (error.message.includes('rate limit')) {
            return "I'm receiving too many requests right now. Please wait a moment and try again.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            return "I'm having trouble connecting to the AI service. Please check your internet connection and try again.";
        }
        
        return "I'm sorry, I'm having trouble responding right now. Please try asking your question again.";
    }

    getFallbackResponse(userMessage) {
        // Use the existing predefined responses as fallback
        const message = userMessage.toLowerCase();
        
        // Check for greetings
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return getRandomResponse(chatResponses.greetings);
        }
        
        // Check for tech-related queries
        if (message.includes('tech') || message.includes('coding') || message.includes('programming') || 
            message.includes('software') || message.includes('computer') || message.includes('it')) {
            return getRandomResponse(chatResponses.tech_careers);
        }
        
        // Check for commerce-related queries
        if (message.includes('commerce') || message.includes('business') || message.includes('finance') || 
            message.includes('accounting') || message.includes('marketing')) {
            return getRandomResponse(chatResponses.commerce_careers);
        }
        
        // Check for creative-related queries
        if (message.includes('creative') || message.includes('design') || message.includes('art') || 
            message.includes('writing') || message.includes('media')) {
            return getRandomResponse(chatResponses.creative_careers);
        }
        
        // Default response
        return getRandomResponse(chatResponses.default_responses);
    }

    clearConversation() {
        this.conversationHistory = [];
    }

    // Method to update API key
    updateApiKey(newApiKey) {
        if (newApiKey && newApiKey.startsWith('sk-')) {
            localStorage.setItem('openai_api_key', newApiKey);
            this.apiKey = newApiKey;
            return true;
        }
        return false;
    }

    // Method to remove API key (logout)
    removeApiKey() {
        localStorage.removeItem('openai_api_key');
        this.apiKey = null;
        this.clearConversation();
    }
}

// Create global instance
const openAIService = new OpenAIService();

// Export for use in other files
if (typeof window !== 'undefined') {
    window.openAIService = openAIService;
}