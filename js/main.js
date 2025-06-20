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
    
    // Initialize authentication
    initializeAuth();
    
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
        if (authService.isAuthenticated()) {
            showNotification(`Welcome back, ${authService.user.name}!`, 'success', 3000);
        } else {
            showNotification('Welcome to Career Dendrogram! Sign up to get started.', 'info', 3000);
        }
    }, 1000);
}

function initializeAuth() {
    const userMenu = $('#user-menu');
    const authButtons = $('#auth-buttons');
    const userName = $('#user-name');
    const userPlan = $('#user-plan');
    const userBtn = $('#user-btn');
    const dropdownMenu = $('#dropdown-menu');

    if (authService.isAuthenticated()) {
        // Show user menu
        if (userMenu) userMenu.style.display = 'flex';
        if (authButtons) authButtons.style.display = 'none';
        
        // Update user info
        if (userName) userName.textContent = authService.user.name;
        if (userPlan) {
            userPlan.textContent = authService.user.plan;
            userPlan.className = `user-plan ${authService.user.plan}`;
        }
        
        // Handle dropdown
        if (userBtn && dropdownMenu) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
            
            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('show');
            });
        }
    } else {
        // Show auth buttons
        if (userMenu) userMenu.style.display = 'none';
        if (authButtons) authButtons.style.display = 'flex';
    }
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
        const upgradeModal = $('#upgrade-modal');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
        
        if (upgradeModal && upgradeModal.style.display !== 'none') {
            closeUpgradeModal();
        }
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
        
        // Refresh user data if authenticated
        if (authService.isAuthenticated()) {
            authService.getProfile();
        }
    }
}

// Enhanced navigation with history support
function navigateToPage(pageName, addToHistory = true) {
    if (!pageName) return;
    
    try {
        // Check if user needs to be authenticated for certain pages
        const protectedPages = ['ai-chat'];
        if (protectedPages.includes(pageName) && !authService.isAuthenticated()) {
            showNotification('Please login to access this feature', 'warning');
            window.location.href = 'pages/login.html';
            return;
        }
        
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

// Upgrade modal functions
function showUpgradeModal() {
    const modal = $('#upgrade-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeUpgradeModal() {
    const modal = $('#upgrade-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

async function upgradePlan(plan) {
    try {
        showLoading();
        
        // Simulate payment processing
        await simulateDelay(2000);
        
        const result = await authService.upgradePlan(plan);
        
        if (result.success) {
            hideLoading();
            closeUpgradeModal();
            showNotification(`Successfully upgraded to ${plan} plan!`, 'success');
            
            // Update UI
            initializeAuth();
            updateChatStatus();
        } else {
            hideLoading();
            showNotification(result.error || 'Upgrade failed', 'error');
        }
    } catch (error) {
        hideLoading();
        showNotification('Upgrade failed. Please try again.', 'error');
    }
}

// Profile and upgrade functions
function showProfile() {
    if (!authService.isAuthenticated()) return;
    
    const user = authService.user;
    const chatLimits = {
        free: 30,
        monthly: 1000,
        quarterly: 3000
    };
    
    const limit = chatLimits[user.plan] || 30;
    const percentage = Math.round((user.chatCount / limit) * 100);
    
    showNotification(
        `Profile: ${user.name}\nPlan: ${user.plan.toUpperCase()}\nChats used: ${user.chatCount}/${limit} (${percentage}%)`,
        'info',
        5000
    );
}

function showUpgrade() {
    showUpgradeModal();
}

// Chat status update
function updateChatStatus() {
    if (!authService.isAuthenticated()) return;
    
    const usageText = $('#usage-text');
    const usageFill = $('#usage-fill');
    
    if (!usageText || !usageFill) return;
    
    const user = authService.user;
    const chatLimits = {
        free: 30,
        monthly: 1000,
        quarterly: 3000
    };
    
    const limit = chatLimits[user.plan] || 30;
    const percentage = (user.chatCount / limit) * 100;
    
    usageText.textContent = `${user.chatCount}/${limit} chats used (${user.plan.toUpperCase()} plan)`;
    usageFill.style.width = `${Math.min(percentage, 100)}%`;
    
    // Update color based on usage
    usageFill.className = 'usage-fill';
    if (percentage >= 90) {
        usageFill.classList.add('danger');
    } else if (percentage >= 70) {
        usageFill.classList.add('warning');
    }
}

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
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        navigateToPage(e.state.page, false);
    } else {
        navigateToPage('home', false);
    }
});

// Global functions
window.navigateToPage = navigateToPage;
window.showUpgradeModal = showUpgradeModal;
window.closeUpgradeModal = closeUpgradeModal;
window.upgradePlan = upgradePlan;
window.showProfile = showProfile;
window.showUpgrade = showUpgrade;
window.updateChatStatus = updateChatStatus;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}