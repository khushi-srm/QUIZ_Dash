// Authentication system using localStorage

function register(fullName, email, password) {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('quizzo_users') || '[]');
    
    // Check if email already exists
    if (users.find(user => user.email === email)) {
        return false;
    }
    
    // Add new user
    const newUser = {
        id: Date.now().toString(),
        fullName: fullName,
        email: email,
        password: password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('quizzo_users', JSON.stringify(users));
    
    return true;
}

function login(email, password) {
    const users = JSON.parse(localStorage.getItem('quizzo_users') || '[]');
    
    // Add demo account if it doesn't exist
    if (!users.find(user => user.email === 'demo@quiz.com')) {
        users.push({
            id: 'demo',
            fullName: 'Demo User',
            email: 'demo@quiz.com',
            password: 'password123',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('quizzo_users', JSON.stringify(users));
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current session
        localStorage.setItem('quizzo_current_user', JSON.stringify({
            id: user.id,
            fullName: user.fullName,
            email: user.email
        }));
        return true;
    }
    
    return false;
}

function isLoggedIn() {
    return localStorage.getItem('quizzo_current_user') !== null;
}

function getCurrentUser() {
    const userStr = localStorage.getItem('quizzo_current_user');
    return userStr ? JSON.parse(userStr) : null;
}

function logoutUser() {
    localStorage.removeItem('quizzo_current_user');
}