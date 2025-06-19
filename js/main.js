// Main JavaScript file for Career Dendrogram website

// Global state
let currentPage = 'home';
let isInitialized = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
    } catch (error) {
        handleError(error, 'Application initialization');
    }
});

function initializeApp() {
    if (isInitialized) return;
    
    console.log('Initializing Career Dendrogram...');
    
    // Initialize theme
    const savedTheme = getPreferredTheme();
    setTheme(savedTheme);
    
    // Initialize components
    initializeComponents();
    
    // Set up global event listeners
    setupGlobalEventListeners();
    
    // Initialize the home page
    navigateToPage('home');
    
    // Mark as initialized
    isInitialized = true;
    
    console.log('Career Dendrogram initialized successfully!');
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Career Dendrogram! Start exploring your career path.', 'info', 3000);
    }, 1000);
}

function setupGlobalEventListeners() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleWindowResize();
        }, 250);
    });
    
    // Handle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            handleScroll();
        }, 100);
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Handle online/offline status
    window.addEventListener('online', () => {
        showNotification('Connection restored', 'success', 2000);
    });
    
    window.addEventListener('offline', () => {
        showNotification('You are offline. Some features may not work.', 'warning', 5000);
    });
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function handleWindowResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = $('#nav-menu');
        const mobileToggle = $('#mobile-menu-toggle');
        
        if (navMenu && mobileToggle) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
    
    // Adjust chat messages height on mobile
    const chatMessages = $('#chat-messages');
    if (chatMessages && window.innerWidth <= 768) {
        chatMessages.style.height = `${window.innerHeight * 0.4}px`;
    }
}

function handleScroll() {
    const navbar = $('#navbar');
    if (!navbar) return;
    
    // Add/remove scrolled class for navbar styling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    const scrollToTop = $('#scroll-to-top');
    if (scrollToTop) {
        if (window.scrollY > 500) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    }
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = $('#career-search') || $('#chat-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals/menus
    if (e.key === 'Escape') {
        const navMenu = $('#nav-menu');
        const mobileToggle = $('#mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
    
    // Arrow keys for quiz navigation
    if (currentPage === 'quiz') {
        if (e.key === 'ArrowLeft' && typeof previousQuestion === 'function') {
            previousQuestion();
        } else if (e.key === 'ArrowRight' && typeof nextQuestion === 'function') {
            nextQuestion();
        }
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden (user switched tabs)
        console.log('Page hidden');
    } else {
        // Page is visible again
        console.log('Page visible');
        
        // Refresh any time-sensitive data if needed
        if (currentPage === 'ai-chat') {
            // Could refresh chat status or check for new messages
        }
    }
}

// Enhanced navigation with history support
function navigateToPage(pageName, addToHistory = true) {
    if (!pageName) return;
    
    try {
        // Hide all pages
        const pages = $$('.page');
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Show target page
        const targetPage = $(`#${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.display = 'block';
            
            // Update navigation
            updateActiveNavLink(pageName);
            
            // Update current page
            currentPage = pageName;
            
            // Initialize page-specific functionality
            initializePage(pageName);
            
            // Add to browser history
            if (addToHistory && window.history) {
                const url = pageName === 'home' ? '/' : `/#${pageName}`;
                window.history.pushState({ page: pageName }, '', url);
            }
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update page title
            updatePageTitle(pageName);
            
            // Track page view (for analytics if implemented)
            trackPageView(pageName);
            
        } else {
            console.warn(`Page not found: ${pageName}`);
            showNotification('Page not found', 'error');
        }
    } catch (error) {
        handleError(error, `Navigation to ${pageName}`);
    }
}

function updatePageTitle(pageName) {
    const titles = {
        'home': 'Career Dendrogram - Find Your Perfect Career Path with AI',
        'ai-chat': 'AI Career Assistant - Career Dendrogram',
        'interest-form': 'Career Suggestions by Interest - Career Dendrogram',
        'quiz': 'Career Personality Quiz - Career Dendrogram',
        'careers': 'Career Paths Explorer - Career Dendrogram',
        'colleges': 'Colleges & Entrance Exams - Career Dendrogram',
        'contact': 'Contact Us - Career Dendrogram'
    };
    
    document.title = titles[pageName] || 'Career Dendrogram';
}

function trackPageView(pageName) {
    // Placeholder for analytics tracking
    console.log(`Page view: ${pageName}`);
    
    // In a real implementation, you might send data to Google Analytics, etc.
    // gtag('config', 'GA_MEASUREMENT_ID', {
    //     page_title: document.title,
    //     page_location: window.location.href
    // });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        navigateToPage(e.state.page, false);
    } else {
        // Default to home page
        navigateToPage('home', false);
    }
});

// Enhanced error handling with user feedback
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    let message = 'Something went wrong. Please try again.';
    
    // Customize message based on error type
    if (error.name === 'NetworkError') {
        message = 'Network error. Please check your connection.';
    } else if (error.name === 'TypeError') {
        message = 'A technical error occurred. Please refresh the page.';
    }
    
    showNotification(message, 'error');
    
    // Log error for debugging (in production, send to error tracking service)
    const errorLog = {
        timestamp: new Date().toISOString(),
        context,
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack
        },
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    console.log('Error log:', errorLog);
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                console.log(`Page load time: ${loadTime}ms`);
                
                // Log slow loading
                if (loadTime > 3000) {
                    console.warn('Slow page load detected');
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Service worker registration (for future PWA features)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    // Function to announce page changes
    window.announcePageChange = (pageName) => {
        const pageNames = {
            'home': 'Home page',
            'ai-chat': 'AI Career Assistant page',
            'interest-form': 'Career Interest Form page',
            'quiz': 'Career Personality Quiz page',
            'careers': 'Career Paths page',
            'colleges': 'Colleges and Exams page',
            'contact': 'Contact page'
        };
        
        announcer.textContent = `Navigated to ${pageNames[pageName] || pageName}`;
    };
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Utility functions for global use
window.CareerDendrogram = {
    navigateToPage,
    showNotification,
    handleError,
    getCurrentPage: () => currentPage,
    isInitialized: () => isInitialized
};

// Debug mode for development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debug = {
        careersData,
        interestsData,
        quizQuestions,
        personalityTypes,
        collegesData,
        currentPage: () => currentPage,
        navigateToPage,
        showNotification
    };
    
    console.log('Debug mode enabled. Access debug object via window.debug');
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        navigateToPage,
        handleError,
        trackPageView
    };
}