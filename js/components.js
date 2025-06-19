// Component builders for Career Dendrogram website

// Navigation component functions
function initializeNavigation() {
    const navLinks = $$('.nav-link');
    const mobileToggle = $('#mobile-menu-toggle');
    const navMenu = $('#nav-menu');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            navigateToPage(targetPage);
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Handle mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

function updateActiveNavLink(activePage) {
    const navLinks = $$('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === activePage) {
            link.classList.add('active');
        }
    });
}

// Page navigation functions
function navigateToPage(pageName) {
    // Hide all pages
    const pages = $$('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = $(`#${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        updateActiveNavLink(pageName);
        
        // Initialize page-specific functionality
        initializePage(pageName);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function initializePage(pageName) {
    switch (pageName) {
        case 'interest-form':
            initializeInterestForm();
            break;
        case 'ai-chat':
            initializeAIChat();
            break;
        case 'quiz':
            initializeQuiz();
            break;
        case 'careers':
            initializeCareersPage();
            break;
        case 'colleges':
            initializeCollegesPage();
            break;
        case 'contact':
            initializeContactForm();
            break;
    }
}

// Interest Form component
function initializeInterestForm() {
    const interestsGrid = $('#interests-grid');
    const getSuggestionsBtn = $('#get-suggestions');
    const regenerateBtn = $('#regenerate-suggestions');
    const resultsSection = $('#results-section');
    const downloadBtn = $('#download-report');
    
    if (!interestsGrid) return;
    
    // Build interests grid
    buildInterestsGrid(interestsGrid);
    
    // Handle get suggestions
    if (getSuggestionsBtn) {
        getSuggestionsBtn.addEventListener('click', handleGetSuggestions);
    }
    
    // Handle regenerate suggestions
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', handleRegenerateSuggestions);
    }
    
    // Handle download report
    if (downloadBtn) {
        downloadBtn.addEventListener('click', handleDownloadReport);
    }
}

function buildInterestsGrid(container) {
    container.innerHTML = '';
    
    interestsData.forEach(interest => {
        const interestEl = document.createElement('div');
        interestEl.className = 'interest-item';
        interestEl.setAttribute('data-interest', interest.id);
        
        interestEl.innerHTML = `
            <i class="${interest.icon}"></i>
            <span>${interest.name}</span>
        `;
        
        interestEl.addEventListener('click', () => {
            interestEl.classList.toggle('selected');
        });
        
        container.appendChild(interestEl);
    });
}

async function handleGetSuggestions() {
    const selectedInterests = getSelectedInterests();
    
    if (selectedInterests.length === 0) {
        showNotification('Please select at least one interest', 'warning');
        return;
    }
    
    showLoading();
    await simulateDelay();
    
    const careers = filterCareersByInterests(selectedInterests);
    displayCareerResults(careers);
    hideLoading();
    
    // Show results section and regenerate button
    $('#results-section').style.display = 'block';
    $('#regenerate-suggestions').style.display = 'inline-flex';
}

async function handleRegenerateSuggestions() {
    const selectedInterests = getSelectedInterests();
    
    showLoading();
    await simulateDelay(1000);
    
    let careers = filterCareersByInterests(selectedInterests);
    careers = shuffleArray(careers);
    displayCareerResults(careers);
    hideLoading();
}

function getSelectedInterests() {
    const selected = $$('.interest-item.selected');
    return Array.from(selected).map(item => item.getAttribute('data-interest'));
}

function displayCareerResults(careers) {
    const resultsContainer = $('#career-results');
    const filterTags = $('#filter-tags');
    
    if (!resultsContainer) return;
    
    // Build filter tags
    buildFilterTags(careers, filterTags);
    
    // Display career cards
    buildCareerCards(careers, resultsContainer);
}

function buildFilterTags(careers, container) {
    if (!container) return;
    
    const allTags = [];
    careers.forEach(career => {
        allTags.push(...career.tags);
    });
    
    const uniqueTags = [...new Set(allTags)];
    container.innerHTML = '';
    
    // Add "All" tag
    const allTag = document.createElement('div');
    allTag.className = 'filter-tag active';
    allTag.textContent = 'All';
    allTag.addEventListener('click', () => filterResults('all'));
    container.appendChild(allTag);
    
    uniqueTags.forEach(tag => {
        const tagEl = document.createElement('div');
        tagEl.className = 'filter-tag';
        tagEl.textContent = tag;
        tagEl.addEventListener('click', () => filterResults(tag));
        container.appendChild(tagEl);
    });
}

function filterResults(selectedTag) {
    const filterTags = $$('.filter-tag');
    const careerCards = $$('.career-card');
    
    // Update active tag
    filterTags.forEach(tag => {
        tag.classList.remove('active');
        if (tag.textContent === selectedTag || (selectedTag === 'all' && tag.textContent === 'All')) {
            tag.classList.add('active');
        }
    });
    
    // Filter career cards
    careerCards.forEach(card => {
        const cardTags = JSON.parse(card.getAttribute('data-tags') || '[]');
        
        if (selectedTag === 'all' || cardTags.includes(selectedTag)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function buildCareerCards(careers, container) {
    container.innerHTML = '';
    
    careers.forEach(career => {
        const careerCard = document.createElement('div');
        careerCard.className = 'career-card';
        careerCard.setAttribute('data-tags', JSON.stringify(career.tags));
        
        careerCard.innerHTML = `
            <div class="career-header">
                <div>
                    <h3 class="career-title">${career.name}</h3>
                    <span class="career-category">${career.category}</span>
                </div>
            </div>
            <p class="career-overview">${career.overview}</p>
            <div class="career-details">
                <div class="detail-section">
                    <h4>Required Skills</h4>
                    <div class="skill-tags">
                        ${career.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Education Roadmap</h4>
                    <ul class="roadmap-list">
                        ${career.roadmap.slice(0, 3).map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>Salary & Growth</h4>
                    <div class="salary-info">
                        <div class="salary-range">${career.salaryRange}</div>
                        <div class="growth-info">${career.growth}</div>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Top Colleges</h4>
                    <div class="college-tags">
                        ${career.colleges.slice(0, 3).map(college => `<span class="college-tag">${college}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(careerCard);
    });
}

// AI Chat component
function initializeAIChat() {
    const chatInput = $('#chat-input');
    const sendButton = $('#send-message');
    const chatMessages = $('#chat-messages');
    const quickQuestions = $$('.quick-question');
    
    if (!chatInput || !sendButton) return;
    
    // Handle send message
    const handleSendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatInput.value = '';
            handleAIResponse(message);
        }
    };
    
    sendButton.addEventListener('click', handleSendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Handle quick questions
    quickQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            addUserMessage(question);
            handleAIResponse(question);
        });
    });
}

function addUserMessage(message) {
    const chatMessages = $('#chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'message user-message';
    
    messageEl.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleAIResponse(userMessage) {
    const chatMessages = $('#chat-messages');
    
    // Show typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'message bot-message typing';
    typingEl.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>Thinking...</p>
        </div>
    `;
    
    chatMessages.appendChild(typingEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI processing
    await simulateDelay(2000);
    
    // Remove typing indicator
    chatMessages.removeChild(typingEl);
    
    // Add AI response
    const response = getChatResponse(userMessage);
    const responseEl = document.createElement('div');
    responseEl.className = 'message bot-message';
    
    responseEl.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${response}</p>
        </div>
    `;
    
    chatMessages.appendChild(responseEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quiz component
function initializeQuiz() {
    const quizContent = $('#quiz-content');
    const quizResults = $('#quiz-results');
    
    if (!quizContent) return;
    
    // Reset quiz state
    currentQuestionIndex = 0;
    quizAnswers = [];
    
    // Show first question
    displayQuestion(currentQuestionIndex);
    updateProgress();
}

let currentQuestionIndex = 0;
let quizAnswers = [];

function displayQuestion(index) {
    const quizContent = $('#quiz-content');
    const question = quizQuestions[index];
    
    if (!question) return;
    
    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3 class="question-title">${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, optionIndex) => `
                    <div class="quiz-option" data-personality="${option.personality}" data-option="${optionIndex}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-navigation">
                ${index > 0 ? '<button class="btn-secondary" onclick="previousQuestion()">Previous</button>' : '<div></div>'}
                <div></div>
            </div>
        </div>
    `;
    
    // Add option click handlers
    const options = $$('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove previous selections
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Select current option
            option.classList.add('selected');
            
            // Store answer
            const personality = option.getAttribute('data-personality');
            quizAnswers[currentQuestionIndex] = personality;
            
            // Auto-advance after short delay
            setTimeout(() => {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    nextQuestion();
                } else {
                    finishQuiz();
                }
            }, 500);
        });
    });
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function updateProgress() {
    const progressFill = $('#progress-fill');
    const progressText = $('#progress-text');
    
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    }
}

async function finishQuiz() {
    showLoading();
    await simulateDelay();
    
    const personalityType = calculatePersonalityType(quizAnswers);
    const personality = personalityTypes[personalityType];
    
    displayQuizResults(personality);
    hideLoading();
}

function displayQuizResults(personality) {
    const quizContent = $('#quiz-content');
    const quizResults = $('#quiz-results');
    
    quizContent.style.display = 'none';
    quizResults.style.display = 'block';
    
    const recommendedCareers = personality.careers.map(careerId => 
        careersData.find(career => career.id === careerId)
    ).filter(Boolean);
    
    quizResults.innerHTML = `
        <div class="personality-type">
            <h2 class="personality-title">${personality.name}</h2>
            <p class="personality-description">${personality.description}</p>
        </div>
        
        <div class="personality-traits">
            <h3>Your Key Traits:</h3>
            <div class="skill-tags">
                ${personality.traits.map(trait => `<span class="skill-tag">${trait}</span>`).join('')}
            </div>
        </div>
        
        <div class="recommended-careers">
            <h3>Recommended Careers:</h3>
            <div class="career-results">
                ${recommendedCareers.map(career => `
                    <div class="career-card">
                        <div class="career-header">
                            <div>
                                <h4 class="career-title">${career.name}</h4>
                                <span class="career-category">${career.category}</span>
                            </div>
                        </div>
                        <p class="career-overview">${career.overview}</p>
                        <div class="salary-info">
                            <div class="salary-range">${career.salaryRange}</div>
                            <div class="growth-info">${career.growth}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="quiz-actions">
            <button class="btn-primary" onclick="initializeQuiz()">Retake Quiz</button>
            <button class="btn-download" onclick="downloadQuizReport('${personality.name}', ${JSON.stringify(recommendedCareers.map(c => c.id))})">
                <i class="fas fa-download"></i>
                Download Results
            </button>
        </div>
    `;
}

// Careers page component
function initializeCareersPage() {
    const careersGrid = $('#careers-grid');
    const careerSearch = $('#career-search');
    const categoryFilters = $('#category-filters');
    
    if (!careersGrid) return;
    
    // Build category filters
    buildCategoryFilters(categoryFilters);
    
    // Display all careers initially
    displayAllCareers(careersGrid);
    
    // Handle search
    if (careerSearch) {
        const debouncedSearch = debounce((query) => {
            const filtered = searchCareers(careersData, query);
            buildCareerCards(filtered, careersGrid);
        }, 300);
        
        careerSearch.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }
}

function buildCategoryFilters(container) {
    if (!container) return;
    
    const categories = getUniqueValues(careersData, 'category');
    container.innerHTML = '';
    
    // Add "All" filter
    const allFilter = document.createElement('div');
    allFilter.className = 'category-filter active';
    allFilter.textContent = 'All';
    allFilter.addEventListener('click', () => filterByCategory('all'));
    container.appendChild(allFilter);
    
    categories.forEach(category => {
        const filterEl = document.createElement('div');
        filterEl.className = 'category-filter';
        filterEl.textContent = category;
        filterEl.addEventListener('click', () => filterByCategory(category));
        container.appendChild(filterEl);
    });
}

function filterByCategory(category) {
    const filters = $$('.category-filter');
    const careersGrid = $('#careers-grid');
    
    // Update active filter
    filters.forEach(filter => {
        filter.classList.remove('active');
        if (filter.textContent === category || (category === 'all' && filter.textContent === 'All')) {
            filter.classList.add('active');
        }
    });
    
    // Filter and display careers
    const filtered = filterCareersByCategory(careersData, category);
    buildCareerCards(filtered, careersGrid);
}

function displayAllCareers(container) {
    buildCareerCards(careersData, container);
}

// Colleges page component
function initializeCollegesPage() {
    const streamTabs = $$('.tab-btn');
    const collegesContent = $('#colleges-content');
    
    // Handle tab clicks
    streamTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const stream = tab.getAttribute('data-stream');
            switchCollegeStream(stream);
            
            // Update active tab
            streamTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    // Initialize with engineering stream
    switchCollegeStream('engineering');
}

function switchCollegeStream(stream) {
    const collegesContent = $('#colleges-content');
    const streamData = collegesData[stream];
    
    if (!streamData || !collegesContent) return;
    
    collegesContent.innerHTML = `
        <div class="college-section">
            <h3>Top ${streamData.name} Colleges</h3>
            <div class="colleges-list">
                ${streamData.colleges.map(college => `
                    <div class="college-item">
                        <div class="college-name">${college.name}</div>
                        <div class="college-location">${college.location} • Rank: ${college.ranking}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="exams-section">
            <h4>Important Entrance Exams</h4>
            ${streamData.exams.map(exam => `
                <div class="exam-item">
                    <div class="exam-name">${exam.name}</div>
                    <div class="exam-description">${exam.description}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Contact form component
function initializeContactForm() {
    const contactForm = $('#contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactSubmit);
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateRequired(data.name)) {
        showNotification('Please enter your name', 'warning');
        return;
    }
    
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }
    
    if (!validateRequired(data.message)) {
        showNotification('Please enter your message', 'warning');
        return;
    }
    
    showLoading();
    await simulateDelay();
    
    // Simulate form submission
    console.log('Contact form submitted:', data);
    
    hideLoading();
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Download handlers
function handleDownloadReport() {
    const selectedInterests = getSelectedInterests();
    const careers = filterCareersByInterests(selectedInterests);
    
    if (careers.length === 0) {
        showNotification('No career suggestions to download', 'warning');
        return;
    }
    
    generateCareerReport(careers, { interests: selectedInterests });
    showNotification('Career report downloaded successfully!', 'success');
}

function downloadQuizReport(personalityType, careerIds) {
    const careers = careerIds.map(id => careersData.find(c => c.id === id)).filter(Boolean);
    const userProfile = { personalityType, completedQuiz: true };
    
    generateCareerReport(careers, userProfile);
    showNotification('Quiz results downloaded successfully!', 'success');
}

// Theme toggle
function initializeThemeToggle() {
    const themeToggle = $('#theme-toggle');
    
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Initialize all components
function initializeComponents() {
    initializeNavigation();
    initializeThemeToggle();
    
    // Initialize hero buttons
    const heroButtons = $$('[data-page]');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = btn.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.initializeComponents = initializeComponents;
    window.navigateToPage = navigateToPage;
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;
    window.downloadQuizReport = downloadQuizReport;
}