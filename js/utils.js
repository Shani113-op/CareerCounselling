// Utility functions for the Career Dendrogram website

// DOM utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Show/hide loading overlay
function showLoading() {
    const overlay = $('#loading-overlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

function hideLoading() {
    const overlay = $('#loading-overlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Simulate API delay for realistic user experience
function simulateDelay(ms = 1500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Career filtering utilities
function filterCareersByInterests(interests) {
    if (!interests || interests.length === 0) return [];
    
    return careersData.filter(career => {
        return interests.some(interest => 
            career.relatedInterests.includes(interest.toLowerCase())
        );
    });
}

function filterCareersByTags(careers, tags) {
    if (!tags || tags.length === 0) return careers;
    
    return careers.filter(career => {
        return tags.some(tag => 
            career.tags.some(careerTag => 
                careerTag.toLowerCase().includes(tag.toLowerCase())
            )
        );
    });
}

function filterCareersByCategory(careers, category) {
    if (!category || category === 'all') return careers;
    
    return careers.filter(career => 
        career.category.toLowerCase() === category.toLowerCase()
    );
}

function searchCareers(careers, query) {
    if (!query) return careers;
    
    query = query.toLowerCase();
    return careers.filter(career => 
        career.name.toLowerCase().includes(query) ||
        career.overview.toLowerCase().includes(query) ||
        career.skills.some(skill => skill.toLowerCase().includes(query)) ||
        career.category.toLowerCase().includes(query)
    );
}

// Get unique values from array
function getUniqueValues(array, key) {
    return [...new Set(array.map(item => item[key]))];
}

// Shuffle array for random suggestions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Format currency for Indian rupees
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting from localStorage:', error);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}

// Theme utilities
function getPreferredTheme() {
    const saved = getFromLocalStorage('theme');
    if (saved) return saved;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveToLocalStorage('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const themeToggle = $('#theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Animation utilities
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.style.opacity = progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.style.opacity = 1 - progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    requestAnimationFrame(animate);
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

// Quiz utilities
function calculatePersonalityType(answers) {
    const scores = {
        analytical: 0,
        creative: 0,
        social: 0,
        practical: 0
    };
    
    answers.forEach(answer => {
        if (scores.hasOwnProperty(answer)) {
            scores[answer]++;
        }
    });
    
    // Find the personality type with the highest score
    let maxScore = 0;
    let primaryType = 'analytical';
    
    for (const [type, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            primaryType = type;
        }
    }
    
    return primaryType;
}

// Chat utilities
function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

function getChatResponse(userMessage) {
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

// PDF generation utility (placeholder - would need a library like jsPDF in real implementation)
function generateCareerReport(careers, userProfile = {}) {
    // This is a placeholder function
    // In a real implementation, you would use a library like jsPDF
    const reportData = {
        timestamp: new Date().toISOString(),
        userProfile,
        topCareers: careers.slice(0, 3),
        generatedBy: 'Career Dendrogram AI'
    };
    
    // Simulate report generation
    console.log('Career Report Generated:', reportData);
    
    // Create a simple text representation for now
    let reportText = `CAREER REPORT - ${new Date().toLocaleDateString()}\n\n`;
    reportText += `TOP CAREER RECOMMENDATIONS:\n\n`;
    
    careers.slice(0, 3).forEach((career, index) => {
        reportText += `${index + 1}. ${career.name}\n`;
        reportText += `   Category: ${career.category}\n`;
        reportText += `   Overview: ${career.overview}\n`;
        reportText += `   Salary Range: ${career.salaryRange}\n`;
        reportText += `   Required Skills: ${career.skills.join(', ')}\n\n`;
    });
    
    // Create a downloadable blob
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `career-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return reportData;
}

// Error handling utility
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    const errorMessage = 'Something went wrong. Please try again.';
    showNotification(errorMessage, 'error');
}

// Notification utility
function showNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        info: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM and animate in
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const theme = getPreferredTheme();
    setTheme(theme);
});

// Export utilities if in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        $, $$,
        showLoading, hideLoading, simulateDelay,
        filterCareersByInterests, filterCareersByTags, filterCareersByCategory, searchCareers,
        getUniqueValues, shuffleArray, formatCurrency, debounce,
        saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage,
        getPreferredTheme, setTheme, updateThemeIcon,
        fadeIn, fadeOut,
        validateEmail, validateRequired,
        calculatePersonalityType,
        getRandomResponse, getChatResponse,
        generateCareerReport,
        handleError, showNotification
    };
}