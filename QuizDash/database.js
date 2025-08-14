// Database operations using localStorage

function generateQuizCode() {
    return 'QZ' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function saveQuizToDatabase(quiz) {
    const quizzes = JSON.parse(localStorage.getItem('quizzo_quizzes') || '[]');
    
    const newQuiz = {
        ...quiz,
        id: Date.now().toString(),
        code: generateQuizCode()
    };
    
    quizzes.push(newQuiz);
    localStorage.setItem('quizzo_quizzes', JSON.stringify(quizzes));
    
    return newQuiz;
}

function getQuiz(quizId) {
    const quizzes = JSON.parse(localStorage.getItem('quizzo_quizzes') || '[]');
    return quizzes.find(quiz => quiz.id === quizId);
}

function getQuizByCode(code) {
    const quizzes = JSON.parse(localStorage.getItem('quizzo_quizzes') || '[]');
    return quizzes.find(quiz => quiz.code === code);
}

function getUserQuizzes(userEmail) {
    const quizzes = JSON.parse(localStorage.getItem('quizzo_quizzes') || '[]');
    return quizzes.filter(quiz => quiz.creatorEmail === userEmail);
}

function getPublicQuizzes(searchTerm = '') {
    const quizzes = JSON.parse(localStorage.getItem('quizzo_quizzes') || '[]');
    let publicQuizzes = quizzes.filter(quiz => quiz.privacy === 'public');
    
    if (searchTerm) {
        publicQuizzes = publicQuizzes.filter(quiz => 
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    return publicQuizzes;
}

function deleteQuizById(quizId) {
    const quizzes = JSON.parse(localStorage.getItem('quizzo_quizzes') || '[]');
    const filteredQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
    localStorage.setItem('quizzo_quizzes', JSON.stringify(filteredQuizzes));
    
    // Also delete related attempts
    const attempts = JSON.parse(localStorage.getItem('quizzo_attempts') || '[]');
    const filteredAttempts = attempts.filter(attempt => attempt.quizId !== quizId);
    localStorage.setItem('quizzo_attempts', JSON.stringify(filteredAttempts));
}

function saveQuizAttempt(attempt) {
    const attempts = JSON.parse(localStorage.getItem('quizzo_attempts') || '[]');
    
    const newAttempt = {
        ...attempt,
        id: Date.now().toString()
    };
    
    attempts.push(newAttempt);
    localStorage.setItem('quizzo_attempts', JSON.stringify(attempts));
    
    return newAttempt;
}

function getQuizAttempts(quizId) {
    const attempts = JSON.parse(localStorage.getItem('quizzo_attempts') || '[]');
    return attempts.filter(attempt => attempt.quizId === quizId);
}

function getUserAttempts(userEmail) {
    const attempts = JSON.parse(localStorage.getItem('quizzo_attempts') || '[]');
    return attempts.filter(attempt => attempt.userEmail === userEmail);
}