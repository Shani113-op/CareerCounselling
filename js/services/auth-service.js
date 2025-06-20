class AuthService {
    constructor() {
        this.baseURL = 'http://localhost:3001/api';
        this.token = localStorage.getItem('auth_token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true, user: this.user };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    }

    async register(name, email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true, user: this.user };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = 'pages/login.html';
    }

    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }

    async getProfile() {
        try {
            const response = await fetch(`${this.baseURL}/user/profile`, {
                headers: this.getAuthHeaders(),
            });

            if (response.ok) {
                const user = await response.json();
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                return { success: true, user };
            } else {
                return { success: false, error: 'Failed to get profile' };
            }
        } catch (error) {
            console.error('Profile error:', error);
            return { success: false, error: 'Network error' };
        }
    }

    async upgradePlan(plan) {
        try {
            const response = await fetch(`${this.baseURL}/user/upgrade`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ plan }),
            });

            const data = await response.json();

            if (response.ok) {
                this.user = data.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true, user: this.user };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Upgrade error:', error);
            return { success: false, error: 'Network error' };
        }
    }
}

// Create global instance
const authService = new AuthService();

// Export for use in other files
if (typeof window !== 'undefined') {
    window.authService = authService;
}