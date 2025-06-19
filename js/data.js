// Career data and interest mappings
const careersData = [
    {
        id: 'software-engineer',
        name: 'Software Engineer',
        category: 'Technology',
        overview: 'Design, develop, and maintain software applications and systems using various programming languages and technologies.',
        skills: ['Programming', 'Problem Solving', 'Logic', 'Mathematics', 'Communication', 'Team Work'],
        roadmap: [
            'Complete 12th with Math/Computer Science',
            'Bachelor\'s in Computer Science/IT (4 years)',
            'Learn programming languages (Python, Java, JavaScript)',
            'Build projects and create a strong portfolio',
            'Complete internships and gain practical experience',
            'Apply for entry-level developer positions'
        ],
        salaryRange: '₹4-15 LPA',
        growth: 'Excellent - 25% growth expected over next decade',
        relatedInterests: ['coding', 'math', 'logic', 'problem-solving', 'technology', 'computers'],
        colleges: ['IIT Delhi', 'IIT Bombay', 'NIT Trichy', 'IIIT Hyderabad', 'VIT Vellore', 'SRM Chennai'],
        tags: ['Tech', 'High-Salary', 'Remote-Work', 'Innovation']
    },
    {
        id: 'graphic-designer',
        name: 'Graphic Designer',
        category: 'Creative',
        overview: 'Create visual concepts to communicate ideas through art, design, and digital media for various platforms.',
        skills: ['Creativity', 'Design Software', 'Color Theory', 'Typography', 'Communication', 'Visual Thinking'],
        roadmap: [
            'Complete 12th (any stream, Art preferred)',
            'Bachelor\'s in Fine Arts/Design/Visual Communication',
            'Master design software (Photoshop, Illustrator, InDesign)',
            'Build a diverse and impressive portfolio',
            'Take on freelance projects for experience',
            'Apply to design agencies or start freelancing'
        ],
        salaryRange: '₹2-8 LPA',
        growth: 'Good - 13% growth expected with digital media expansion',
        relatedInterests: ['designing', 'art', 'creativity', 'visual', 'aesthetics', 'colors'],
        colleges: ['NID Ahmedabad', 'NIFT Delhi', 'MIT Institute of Design', 'Pearl Academy', 'Srishti School of Art'],
        tags: ['Creative', 'Freelance-Friendly', 'Visual', 'Digital']
    },
    {
        id: 'data-scientist',
        name: 'Data Scientist',
        category: 'Technology',
        overview: 'Analyze complex data sets to extract insights and help organizations make data-driven decisions using statistical methods and machine learning.',
        skills: ['Statistics', 'Programming', 'Mathematics', 'Machine Learning', 'Data Visualization', 'Critical Thinking'],
        roadmap: [
            'Complete 12th with Math and preferably Computer Science',
            'Bachelor\'s in Math/Statistics/Computer Science/Engineering',
            'Learn programming languages (Python/R) and SQL',
            'Study statistics, machine learning, and data analysis',
            'Work on real-world data projects and competitions',
            'Apply for data analyst roles and advance to data scientist'
        ],
        salaryRange: '₹6-20 LPA',
        growth: 'Excellent - 35% growth expected, highest demand field',
        relatedInterests: ['math', 'statistics', 'analysis', 'problem-solving', 'technology', 'research'],
        colleges: ['IIT Kharagpur', 'ISI Kolkata', 'IIM Calcutta', 'IISC Bangalore', 'CMI Chennai'],
        tags: ['Tech', 'High-Salary', 'Analytics', 'Future-Ready']
    },
    {
        id: 'doctor',
        name: 'Medical Doctor',
        category: 'Healthcare',
        overview: 'Diagnose and treat illnesses, injuries, and health conditions while providing compassionate patient care.',
        skills: ['Medical Knowledge', 'Empathy', 'Communication', 'Problem Solving', 'Attention to Detail', 'Stress Management'],
        roadmap: [
            'Complete 12th with Physics, Chemistry, Biology (PCB)',
            'Clear NEET entrance exam with high score',
            'Complete MBBS degree (5.5 years including internship)',
            'Complete mandatory internship (1 year)',
            'Choose specialization with MD/MS (optional, 3 years)',
            'Start medical practice or join hospital'
        ],
        salaryRange: '₹5-25 LPA',
        growth: 'Stable - Always in high demand, recession-proof career',
        relatedInterests: ['helping-people', 'biology', 'health', 'medicine', 'science', 'care'],
        colleges: ['AIIMS Delhi', 'JIPMER Puducherry', 'CMC Vellore', 'KGMU Lucknow', 'BHU Varanasi'],
        tags: ['Healthcare', 'Prestigious', 'Service', 'Stable']
    },
    {
        id: 'teacher',
        name: 'Teacher/Educator',
        category: 'Education',
        overview: 'Educate and inspire students across various subjects and age groups, shaping the future generation.',
        skills: ['Communication', 'Patience', 'Subject Knowledge', 'Leadership', 'Creativity', 'Classroom Management'],
        roadmap: [
            'Complete 12th in your preferred teaching subject',
            'Bachelor\'s degree in subject area + Bachelor of Education (B.Ed)',
            'Clear Teacher Eligibility Test (TET) for your state',
            'Gain teaching experience through practice/internships',
            'Consider Master of Education (M.Ed) for career advancement',
            'Apply to schools/colleges or government teaching positions'
        ],
        salaryRange: '₹3-12 LPA',
        growth: 'Stable - Consistent demand with education sector growth',
        relatedInterests: ['teaching', 'helping-people', 'communication', 'knowledge-sharing', 'mentoring'],
        colleges: ['JNU Delhi', 'BHU Varanasi', 'Jamia Millia Islamia', 'DU (Delhi University)', 'Tata Institute'],
        tags: ['Education', 'Service', 'Government', 'Impactful']
    },
    {
        id: 'chartered-accountant',
        name: 'Chartered Accountant',
        category: 'Finance',
        overview: 'Manage financial records, provide tax advice, conduct audits, and offer financial consulting services to businesses and individuals.',
        skills: ['Mathematics', 'Attention to Detail', 'Financial Analysis', 'Ethics', 'Communication', 'Problem Solving'],
        roadmap: [
            'Complete 12th (Commerce stream preferred but not mandatory)',
            'Register for CA Foundation course',
            'Clear CA Intermediate examination',
            'Complete 3 years of articleship (practical training)',
            'Clear CA Final examination',
            'Start your own practice or join a CA firm'
        ],
        salaryRange: '₹4-18 LPA',
        growth: 'Good - Always needed for business compliance and growth',
        relatedInterests: ['math', 'finance', 'analysis', 'business', 'management', 'accounting'],
        colleges: ['ICAI Centers nationwide', 'Commerce colleges for foundation'],
        tags: ['Finance', 'Prestigious', 'Business', 'Self-Employment']
    },
    {
        id: 'environmental-scientist',
        name: 'Environmental Scientist',
        category: 'Science',
        overview: 'Study environmental problems and develop solutions for environmental issues like pollution, climate change, and conservation.',
        skills: ['Research', 'Data Analysis', 'Chemistry', 'Biology', 'Problem Solving', 'Field Work'],
        roadmap: [
            'Complete 12th with Physics, Chemistry, Math/Biology',
            'Bachelor\'s in Environmental Science/Chemistry/Biology',
            'Gain field experience through internships and projects',
            'Consider Master\'s in Environmental Science for specialization',
            'Work with environmental agencies or consulting firms',
            'Advance to senior research or policy positions'
        ],
        salaryRange: '₹3-10 LPA',
        growth: 'Growing - Increasing focus on environmental protection',
        relatedInterests: ['nature', 'environment', 'science', 'research', 'conservation', 'sustainability'],
        colleges: ['JNU Delhi', 'Jamia Millia Islamia', 'BHU Varanasi', 'University of Delhi', 'IIT Roorkee'],
        tags: ['Science', 'Environment', 'Research', 'Future-Important']
    },
    {
        id: 'psychologist',
        name: 'Psychologist',
        category: 'Healthcare',
        overview: 'Study human behavior and mental processes, providing therapy and counseling to help people overcome psychological challenges.',
        skills: ['Empathy', 'Listening', 'Communication', 'Analysis', 'Patience', 'Problem Solving'],
        roadmap: [
            'Complete 12th (any stream, preferably with Psychology)',
            'Bachelor\'s in Psychology (3 years)',
            'Master\'s in Psychology with specialization (2 years)',
            'Gain practical experience through internships',
            'Consider PhD for research or advanced practice',
            'Start private practice or join healthcare institutions'
        ],
        salaryRange: '₹3-12 LPA',
        growth: 'Excellent - Growing awareness about mental health',
        relatedInterests: ['helping-people', 'psychology', 'human-behavior', 'counseling', 'mental-health'],
        colleges: ['JNU Delhi', 'University of Delhi', 'Jamia Millia Islamia', 'Christ University', 'Fergusson College'],
        tags: ['Healthcare', 'Mental-Health', 'Service', 'Growing-Field']
    },
    {
        id: 'civil-engineer',
        name: 'Civil Engineer',
        category: 'Engineering',
        overview: 'Design, build, and maintain infrastructure projects like buildings, roads, bridges, and water systems.',
        skills: ['Mathematics', 'Problem Solving', 'Design', 'Project Management', 'Technical Drawing', 'Safety Knowledge'],
        roadmap: [
            'Complete 12th with Physics, Chemistry, Math (PCM)',
            'Clear JEE Main/Advanced for top engineering colleges',
            'Bachelor\'s in Civil Engineering (4 years)',
            'Gain practical experience through internships',
            'Consider specialization or Master\'s degree',
            'Join construction companies or government departments'
        ],
        salaryRange: '₹3-12 LPA',
        growth: 'Good - Infrastructure development driving demand',
        relatedInterests: ['math', 'construction', 'design', 'problem-solving', 'building'],
        colleges: ['IIT Delhi', 'IIT Roorkee', 'NIT Trichy', 'BITS Pilani', 'Anna University'],
        tags: ['Engineering', 'Construction', 'Government', 'Infrastructure']
    },
    {
        id: 'journalist',
        name: 'Journalist',
        category: 'Media',
        overview: 'Research, write, and report news stories across various media platforms including print, digital, and broadcast.',
        skills: ['Writing', 'Communication', 'Research', 'Critical Thinking', 'Networking', 'Adaptability'],
        roadmap: [
            'Complete 12th (any stream, preferably with English/Social Studies)',
            'Bachelor\'s in Journalism/Mass Communication/English',
            'Build portfolio through college publications and internships',
            'Gain experience with local newspapers or online platforms',
            'Specialize in areas like sports, politics, or investigative journalism',
            'Join media houses or start independent journalism'
        ],
        salaryRange: '₹2-10 LPA',
        growth: 'Moderate - Digital media creating new opportunities',
        relatedInterests: ['writing', 'communication', 'current-affairs', 'research', 'storytelling'],
        colleges: ['IIMC Delhi', 'Jamia Millia Islamia', 'Xavier Institute', 'Symbiosis Pune', 'ACJ Chennai'],
        tags: ['Media', 'Writing', 'Current-Affairs', 'Creative']
    },
    {
        id: 'architect',
        name: 'Architect',
        category: 'Design',
        overview: 'Design buildings and spaces that are functional, safe, and aesthetically pleasing while considering environmental and social factors.',
        skills: ['Design', 'Creativity', 'Technical Drawing', 'Mathematics', 'Project Management', 'Visualization'],
        roadmap: [
            'Complete 12th with Math (Physics and Chemistry helpful)',
            'Clear NATA entrance exam for architecture colleges',
            'Bachelor of Architecture (B.Arch) - 5 years',
            'Complete mandatory internship during studies',
            'Register with Council of Architecture',
            'Join architectural firms or start independent practice'
        ],
        salaryRange: '₹3-15 LPA',
        growth: 'Good - Urban development and smart cities driving demand',
        relatedInterests: ['designing', 'art', 'creativity', 'building', 'math', 'aesthetics'],
        colleges: ['IIT Roorkee', 'SPA Delhi', 'CEPT Ahmedabad', 'NIT Trichy', 'Jamia Millia Islamia'],
        tags: ['Design', 'Creative', 'Construction', 'Artistic']
    },
    {
        id: 'marketing-manager',
        name: 'Marketing Manager',
        category: 'Business',
        overview: 'Develop and implement marketing strategies to promote products and services, manage brand image, and drive business growth.',
        skills: ['Communication', 'Creativity', 'Analysis', 'Leadership', 'Digital Marketing', 'Strategic Thinking'],
        roadmap: [
            'Complete 12th (any stream, Commerce/Arts preferred)',
            'Bachelor\'s in Business/Marketing/Commerce',
            'Gain experience through internships in marketing roles',
            'Develop skills in digital marketing and analytics',
            'Consider MBA for senior management roles',
            'Join companies in marketing roles and advance to management'
        ],
        salaryRange: '₹4-18 LPA',
        growth: 'Excellent - Digital transformation increasing demand',
        relatedInterests: ['business', 'communication', 'creativity', 'strategy', 'management'],
        colleges: ['IIM Ahmedabad', 'FMS Delhi', 'XLRI Jamshedpur', 'NMIMS Mumbai', 'Christ University'],
        tags: ['Business', 'Management', 'Creative', 'Growth-Oriented']
    },
    {
        id: 'lawyer',
        name: 'Lawyer',
        category: 'Legal',
        overview: 'Provide legal advice, represent clients in court, draft legal documents, and help resolve legal disputes.',
        skills: ['Communication', 'Critical Thinking', 'Research', 'Writing', 'Negotiation', 'Ethics'],
        roadmap: [
            'Complete 12th (any stream, Humanities preferred)',
            'Clear CLAT entrance exam',
            'Complete LLB (3 years) or integrated LLB (5 years)',
            'Complete mandatory internships with law firms',
            'Register with Bar Council and get license to practice',
            'Start independent practice or join law firms'
        ],
        salaryRange: '₹3-20 LPA',
        growth: 'Good - Legal awareness and business growth driving demand',
        relatedInterests: ['law', 'justice', 'communication', 'debate', 'helping-people', 'research'],
        colleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'WBNUJS Kolkata', 'GNLU Gandhinagar', 'Jamia Millia'],
        tags: ['Legal', 'Prestigious', 'Justice', 'High-Income-Potential']
    },
    {
        id: 'chef',
        name: 'Professional Chef',
        category: 'Culinary',
        overview: 'Create and prepare meals in restaurants, hotels, or other food service establishments, managing kitchen operations.',
        skills: ['Cooking', 'Creativity', 'Time Management', 'Leadership', 'Food Safety', 'Innovation'],
        roadmap: [
            'Complete 12th (any stream)',
            'Join culinary school or hotel management course',
            'Gain experience through apprenticeships in kitchens',
            'Work in various kitchen positions to learn all aspects',
            'Specialize in specific cuisines or techniques',
            'Become head chef or open your own restaurant'
        ],
        salaryRange: '₹2-12 LPA',
        growth: 'Good - Food industry and hospitality sector growing',
        relatedInterests: ['cooking', 'creativity', 'food', 'hospitality', 'innovation'],
        colleges: ['Institute of Hotel Management', 'Welcomgroup Graduate School', 'IIHM Kolkata'],
        tags: ['Culinary', 'Creative', 'Hospitality', 'Hands-On']
    },
    {
        id: 'pharmacist',
        name: 'Pharmacist',
        category: 'Healthcare',
        overview: 'Dispense medications, provide drug information, and ensure safe use of pharmaceutical products.',
        skills: ['Chemistry', 'Attention to Detail', 'Communication', 'Medical Knowledge', 'Customer Service'],
        roadmap: [
            'Complete 12th with Physics, Chemistry, Biology/Math',
            'Bachelor of Pharmacy (B.Pharm) - 4 years',
            'Complete internship in pharmacy settings',
            'Register with State Pharmacy Council',
            'Work in hospitals, retail pharmacies, or pharmaceutical companies',
            'Consider Doctor of Pharmacy (Pharm.D) for clinical roles'
        ],
        salaryRange: '₹2-8 LPA',
        growth: 'Stable - Healthcare sector growth ensuring demand',
        relatedInterests: ['medicine', 'chemistry', 'health', 'helping-people', 'science'],
        colleges: ['Jamia Hamdard', 'BHU Varanasi', 'Manipal College', 'JSS College', 'LM College'],
        tags: ['Healthcare', 'Science', 'Stable', 'Service']
    }
];

// Interest categories and related careers
const interestsData = [
    { id: 'math', name: 'Mathematics', icon: 'fas fa-calculator' },
    { id: 'designing', name: 'Designing', icon: 'fas fa-palette' },
    { id: 'helping-people', name: 'Helping People', icon: 'fas fa-hands-helping' },
    { id: 'coding', name: 'Coding', icon: 'fas fa-code' },
    { id: 'writing', name: 'Writing', icon: 'fas fa-pen' },
    { id: 'nature', name: 'Nature', icon: 'fas fa-tree' },
    { id: 'management', name: 'Management', icon: 'fas fa-users-cog' },
    { id: 'science', name: 'Science', icon: 'fas fa-microscope' },
    { id: 'art', name: 'Art', icon: 'fas fa-paint-brush' },
    { id: 'technology', name: 'Technology', icon: 'fas fa-laptop' },
    { id: 'health', name: 'Health', icon: 'fas fa-heartbeat' },
    { id: 'business', name: 'Business', icon: 'fas fa-chart-line' },
    { id: 'communication', name: 'Communication', icon: 'fas fa-comments' },
    { id: 'research', name: 'Research', icon: 'fas fa-search' },
    { id: 'creativity', name: 'Creativity', icon: 'fas fa-lightbulb' },
    { id: 'analysis', name: 'Analysis', icon: 'fas fa-chart-bar' },
    { id: 'problem-solving', name: 'Problem Solving', icon: 'fas fa-puzzle-piece' },
    { id: 'teaching', name: 'Teaching', icon: 'fas fa-chalkboard-teacher' }
];

// Quiz questions for personality assessment
const quizQuestions = [
    {
        id: 1,
        question: "What type of activities do you enjoy most in your free time?",
        options: [
            { text: "Reading books or researching topics online", personality: "analytical" },
            { text: "Creating art, music, or writing", personality: "creative" },
            { text: "Helping friends solve their problems", personality: "social" },
            { text: "Building or fixing things", personality: "practical" }
        ]
    },
    {
        id: 2,
        question: "How do you prefer to work?",
        options: [
            { text: "Independently with minimal supervision", personality: "independent" },
            { text: "In a team where I can collaborate", personality: "social" },
            { text: "Leading a group towards a goal", personality: "leadership" },
            { text: "Following clear instructions and procedures", personality: "structured" }
        ]
    },
    {
        id: 3,
        question: "What motivates you the most?",
        options: [
            { text: "Solving complex problems and puzzles", personality: "analytical" },
            { text: "Creating something new and original", personality: "creative" },
            { text: "Making a positive impact on others", personality: "social" },
            { text: "Achieving financial success and stability", personality: "practical" }
        ]
    },
    {
        id: 4,
        question: "Which subject did you find most interesting in school?",
        options: [
            { text: "Mathematics and Science", personality: "analytical" },
            { text: "Arts, Literature, or Music", personality: "creative" },
            { text: "History, Psychology, or Social Studies", personality: "social" },
            { text: "Physical Education or Technical subjects", personality: "practical" }
        ]
    },
    {
        id: 5,
        question: "How do you handle stress and pressure?",
        options: [
            { text: "I analyze the situation and create a logical plan", personality: "analytical" },
            { text: "I find creative outlets to express my feelings", personality: "creative" },
            { text: "I talk to friends or family for support", personality: "social" },
            { text: "I take action immediately to solve the problem", personality: "practical" }
        ]
    },
    {
        id: 6,
        question: "What kind of environment do you thrive in?",
        options: [
            { text: "Quiet, organized spaces with minimal distractions", personality: "analytical" },
            { text: "Dynamic, inspiring spaces with room for expression", personality: "creative" },
            { text: "Collaborative spaces with lots of interaction", personality: "social" },
            { text: "Hands-on environments with practical tools", personality: "practical" }
        ]
    },
    {
        id: 7,
        question: "How do you make important decisions?",
        options: [
            { text: "By gathering data and analyzing all options", personality: "analytical" },
            { text: "By following my intuition and gut feeling", personality: "creative" },
            { text: "By consulting with others and considering their input", personality: "social" },
            { text: "By considering practical outcomes and efficiency", personality: "practical" }
        ]
    },
    {
        id: 8,
        question: "What would you most like to be remembered for?",
        options: [
            { text: "Making important discoveries or innovations", personality: "analytical" },
            { text: "Creating beautiful or meaningful works", personality: "creative" },
            { text: "Helping and inspiring others", personality: "social" },
            { text: "Building something lasting and useful", personality: "practical" }
        ]
    }
];

// Personality types and their career recommendations
const personalityTypes = {
    analytical: {
        name: "The Analytical Thinker",
        description: "You excel at breaking down complex problems, analyzing information, and finding logical solutions. You prefer structured environments and data-driven decisions.",
        careers: ['data-scientist', 'software-engineer', 'chartered-accountant', 'environmental-scientist', 'civil-engineer'],
        traits: ["Logical thinking", "Problem-solving", "Attention to detail", "Research skills", "Data analysis"]
    },
    creative: {
        name: "The Creative Innovator",
        description: "You thrive on imagination, originality, and artistic expression. You see possibilities where others see problems and love bringing new ideas to life.",
        careers: ['graphic-designer', 'architect', 'journalist', 'chef', 'marketing-manager'],
        traits: ["Imagination", "Artistic ability", "Innovation", "Flexibility", "Visual thinking"]
    },
    social: {
        name: "The People Helper",
        description: "You are naturally drawn to helping others and making a positive impact. You excel in communication and building relationships.",
        careers: ['teacher', 'doctor', 'psychologist', 'lawyer', 'marketing-manager'],
        traits: ["Empathy", "Communication", "Leadership", "Interpersonal skills", "Service orientation"]
    },
    practical: {
        name: "The Practical Builder",
        description: "You prefer hands-on work and practical solutions. You like to see tangible results from your efforts and work well with tools and systems.",
        careers: ['civil-engineer', 'chef', 'pharmacist', 'architect', 'environmental-scientist'],
        traits: ["Hands-on skills", "Problem-solving", "Organization", "Efficiency", "Results-oriented"]
    }
};

// College and exam data organized by stream
const collegesData = {
    engineering: {
        name: "Engineering",
        colleges: [
            { name: "Indian Institute of Technology (IIT) Delhi", location: "New Delhi", ranking: "#1" },
            { name: "Indian Institute of Technology (IIT) Bombay", location: "Mumbai", ranking: "#2" },
            { name: "Indian Institute of Technology (IIT) Madras", location: "Chennai", ranking: "#3" },
            { name: "Indian Institute of Science (IISc)", location: "Bangalore", ranking: "#4" },
            { name: "Indian Institute of Technology (IIT) Kanpur", location: "Kanpur", ranking: "#5" },
            { name: "National Institute of Technology (NIT) Trichy", location: "Tiruchirappalli", ranking: "#6" },
            { name: "Indian Institute of Technology (IIT) Roorkee", location: "Roorkee", ranking: "#7" },
            { name: "Indian Institute of Technology (IIT) Guwahati", location: "Guwahati", ranking: "#8" },
            { name: "Birla Institute of Technology and Science (BITS)", location: "Pilani", ranking: "#9" },
            { name: "Vellore Institute of Technology (VIT)", location: "Vellore", ranking: "#10" }
        ],
        exams: [
            { name: "JEE Main", description: "National level entrance exam for engineering admission" },
            { name: "JEE Advanced", description: "For admission to IITs, conducted after JEE Main" },
            { name: "BITSAT", description: "For admission to BITS Pilani campuses" },
            { name: "VITEEE", description: "For admission to VIT universities" },
            { name: "SRMJEEE", description: "For admission to SRM University" }
        ]
    },
    medical: {
        name: "Medical",
        colleges: [
            { name: "All India Institute of Medical Sciences (AIIMS)", location: "New Delhi", ranking: "#1" },
            { name: "JIPMER", location: "Puducherry", ranking: "#2" },
            { name: "Christian Medical College (CMC)", location: "Vellore", ranking: "#3" },
            { name: "King George's Medical University", location: "Lucknow", ranking: "#4" },
            { name: "Banaras Hindu University (BHU)", location: "Varanasi", ranking: "#5" },
            { name: "Maulana Azad Medical College", location: "New Delhi", ranking: "#6" },
            { name: "Grant Medical College", location: "Mumbai", ranking: "#7" },
            { name: "Armed Forces Medical College", location: "Pune", ranking: "#8" },
            { name: "Kasturba Medical College", location: "Mangalore", ranking: "#9" },
            { name: "St. John's Medical College", location: "Bangalore", ranking: "#10" }
        ],
        exams: [
            { name: "NEET UG", description: "National eligibility cum entrance test for undergraduate medical courses" },
            { name: "NEET PG", description: "For postgraduate medical courses (MD/MS)" },
            { name: "AIIMS MBBS", description: "Separate exam for AIIMS institutions (now merged with NEET)" },
            { name: "JIPMER MBBS", description: "For JIPMER Puducherry and Karaikal (now through NEET)" }
        ]
    },
    management: {
        name: "Management",
        colleges: [
            { name: "Indian Institute of Management (IIM) Ahmedabad", location: "Ahmedabad", ranking: "#1" },
            { name: "Indian Institute of Management (IIM) Bangalore", location: "Bangalore", ranking: "#2" },
            { name: "Indian Institute of Management (IIM) Calcutta", location: "Kolkata", ranking: "#3" },
            { name: "Faculty of Management Studies (FMS)", location: "Delhi", ranking: "#4" },
            { name: "Xavier Labour Relations Institute (XLRI)", location: "Jamshedpur", ranking: "#5" },
            { name: "SP Jain Institute of Management", location: "Mumbai", ranking: "#6" },
            { name: "Management Development Institute (MDI)", location: "Gurgaon", ranking: "#7" },
            { name: "Indian School of Business (ISB)", location: "Hyderabad", ranking: "#8" },
            { name: "NMIMS Mumbai", location: "Mumbai", ranking: "#9" },
            { name: "Symbiosis Institute of Business Management", location: "Pune", ranking: "#10" }
        ],
        exams: [
            { name: "CAT", description: "Common Admission Test for IIMs and other top B-schools" },
            { name: "XAT", description: "Xavier Aptitude Test for XLRI and other institutes" },
            { name: "SNAP", description: "Symbiosis National Aptitude Test" },
            { name: "NMAT", description: "NMIMS Management Aptitude Test" },
            { name: "MAT", description: "Management Aptitude Test accepted by many institutes" }
        ]
    },
    arts: {
        name: "Arts & Humanities",
        colleges: [
            { name: "Jawaharlal Nehru University (JNU)", location: "New Delhi", ranking: "#1" },
            { name: "University of Delhi", location: "New Delhi", ranking: "#2" },
            { name: "Banaras Hindu University (BHU)", location: "Varanasi", ranking: "#3" },
            { name: "Jamia Millia Islamia", location: "New Delhi", ranking: "#4" },
            { name: "Aligarh Muslim University (AMU)", location: "Aligarh", ranking: "#5" },
            { name: "Presidency University", location: "Kolkata", ranking: "#6" },
            { name: "Christ University", location: "Bangalore", ranking: "#7" },
            { name: "Fergusson College", location: "Pune", ranking: "#8" },
            { name: "Loyola College", location: "Chennai", ranking: "#9" },
            { name: "St. Stephen's College", location: "Delhi", ranking: "#10" }
        ],
        exams: [
            { name: "DUET", description: "Delhi University Entrance Test for various UG/PG courses" },
            { name: "JNU Entrance Exam", description: "For admission to JNU undergraduate and postgraduate programs" },
            { name: "BHU UET", description: "Banaras Hindu University Undergraduate Entrance Test" },
            { name: "Jamia Entrance Exam", description: "For various courses at Jamia Millia Islamia" },
            { name: "CUET", description: "Common University Entrance Test for central universities" }
        ]
    },
    commerce: {
        name: "Commerce",
        colleges: [
            { name: "Shri Ram College of Commerce (SRCC)", location: "Delhi", ranking: "#1" },
            { name: "Lady Shri Ram College", location: "Delhi", ranking: "#2" },
            { name: "Loyola College", location: "Chennai", ranking: "#3" },
            { name: "Christ University", location: "Bangalore", ranking: "#4" },
            { name: "St. Xavier's College", location: "Mumbai", ranking: "#5" },
            { name: "Hindu College", location: "Delhi", ranking: "#6" },
            { name: "Hansraj College", location: "Delhi", ranking: "#7" },
            { name: "Presidency College", location: "Chennai", ranking: "#8" },
            { name: "Fergusson College", location: "Pune", ranking: "#9" },
            { name: "NMIMS", location: "Mumbai", ranking: "#10" }
        ],
        exams: [
            { name: "CA Foundation", description: "Entry level exam for Chartered Accountancy course" },
            { name: "CS Foundation", description: "For Company Secretary course" },
            { name: "CMA Foundation", description: "For Cost and Management Accountant course" },
            { name: "DUET", description: "For B.Com (Hons) at Delhi University colleges" },
            { name: "IPU CET", description: "For BBA/B.Com courses at IP University" }
        ]
    },
    law: {
        name: "Law",
        colleges: [
            { name: "National Law School of India University (NLSIU)", location: "Bangalore", ranking: "#1" },
            { name: "NALSAR University of Law", location: "Hyderabad", ranking: "#2" },
            { name: "West Bengal National University of Juridical Sciences", location: "Kolkata", ranking: "#3" },
            { name: "Gujarat National Law University", location: "Gandhinagar", ranking: "#4" },
            { name: "Jamia Millia Islamia", location: "New Delhi", ranking: "#5" },
            { name: "Rajiv Gandhi School of Intellectual Property Law", location: "Kharagpur", ranking: "#6" },
            { name: "Symbiosis Law School", location: "Pune", ranking: "#7" },
            { name: "Jindal Global Law School", location: "Sonipat", ranking: "#8" },
            { name: "Faculty of Law, University of Delhi", location: "Delhi", ranking: "#9" },
            { name: "Government Law College", location: "Mumbai", ranking: "#10" }
        ],
        exams: [
            { name: "CLAT", description: "Common Law Admission Test for National Law Universities" },
            { name: "AILET", description: "All India Law Entrance Test for NLU Delhi" },
            { name: "LSAT India", description: "Law School Admission Test for private law schools" },
            { name: "SET", description: "Symbiosis Entrance Test for law courses" },
            { name: "DU LLB", description: "Delhi University entrance exam for LLB courses" }
        ]
    }
};

// Chat responses for AI assistant
const chatResponses = {
    greetings: [
        "Hello! I'm here to help you explore career options. What would you like to know?",
        "Hi there! Ready to discover your perfect career path? Ask me anything!",
        "Welcome! I'm your AI career assistant. How can I guide you today?"
    ],
    tech_careers: [
        "Tech careers are booming! Here are some top options:\n\n• Software Engineer (₹4-15 LPA): Build applications and websites\n• Data Scientist (₹6-20 LPA): Analyze data to solve business problems\n• Cybersecurity Specialist (₹5-18 LPA): Protect digital systems\n• AI/ML Engineer (₹8-25 LPA): Develop intelligent systems\n\nWhich area interests you most?",
        "The tech industry offers incredible opportunities! Popular fields include software development, data science, artificial intelligence, and cybersecurity. Each has excellent growth prospects and high earning potential. Would you like details about any specific tech career?"
    ],
    commerce_careers: [
        "Commerce opens doors to many exciting careers:\n\n• Chartered Accountant (₹4-18 LPA): Financial expertise and consulting\n• Investment Banking (₹6-25 LPA): High-finance and deal-making\n• Marketing Manager (₹4-15 LPA): Brand building and strategy\n• Business Analyst (₹4-12 LPA): Problem-solving for businesses\n\nWhat aspect of business interests you most?",
        "With a commerce background, you can pursue finance, marketing, consulting, or entrepreneurship. The key is identifying whether you prefer numbers (finance/accounting), people (marketing/HR), or strategy (consulting/management)."
    ],
    creative_careers: [
        "Creative careers are perfect for artistic minds:\n\n• Graphic Designer (₹2-8 LPA): Visual communication and branding\n• Content Creator (₹3-12 LPA): Digital media and storytelling\n• Architect (₹3-15 LPA): Design buildings and spaces\n• Fashion Designer (₹2-10 LPA): Create clothing and accessories\n\nWhat type of creativity excites you most?",
        "The creative industry is thriving with digital transformation! Whether it's visual design, content creation, architecture, or media production, there are numerous paths to explore. Many creative careers also offer freelancing opportunities."
    ],
    default_responses: [
        "That's an interesting question! Could you be more specific about what career aspect you'd like to explore? I can help with career suggestions, salary information, education requirements, or skill development.",
        "I'd love to help you with that! Can you tell me more about your interests, academic background, or what specific career information you're looking for?",
        "Great question! To give you the best guidance, could you share more details about your interests, strengths, or the type of work environment you prefer?"
    ]
};

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        careersData,
        interestsData,
        quizQuestions,
        personalityTypes,
        collegesData,
        chatResponses
    };
}