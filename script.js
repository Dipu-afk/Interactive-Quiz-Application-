// Quiz questions data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        correct: 3
    },
    {
        question: "Which country is home to the Great Barrier Reef?",
        options: ["Brazil", "Australia", "Indonesia", "Thailand"],
        correct: 1
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: 2
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Iron", "Silver"],
        correct: 1
    },
    {
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Gazelle", "Leopard"],
        correct: 1
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mars", "Mercury", "Earth"],
        correct: 2
    },
    {
        question: "What year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let isAnswering = true;
let shuffledQuestions = [];

// DOM elements
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const scoreContainer = document.getElementById('score-container');
const finalScore = document.getElementById('final-score');
const totalQuestions = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.querySelector('.progress');

// Initialize quiz
function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    isAnswering = true;
    scoreContainer.classList.add('hidden');
    // Shuffle questions
    shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
    updateProgress();
    loadQuestion();
}

// Load question
function loadQuestion() {
    if (currentQuestion >= 10) {  // Show only 10 questions
        showFinalScore();
        return;
    }

    const question = shuffledQuestions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    feedbackElement.classList.add('hidden');

    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    isAnswering = true;
    updateProgress();
}

// Check answer
function checkAnswer(selectedIndex) {
    if (!isAnswering) return;
    isAnswering = false;

    const question = shuffledQuestions[currentQuestion];
    const options = optionsContainer.children;
    const correct = question.correct;

    // Show correct/incorrect feedback
    options[selectedIndex].classList.add(selectedIndex === correct ? 'correct' : 'incorrect');
    options[correct].classList.add('correct');

    // Update score and show feedback
    if (selectedIndex === correct) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1500);
}

// Show feedback
function showFeedback(isCorrect) {
    feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackElement.classList.remove('hidden');
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / 10) * 100;  // Progress based on 10 questions
    progressBar.style.width = `${progress}%`;
}

// Show final score
function showFinalScore() {
    questionContainer.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    finalScore.textContent = score;
    totalQuestions.textContent = 10;
}

// Event listeners
restartBtn.addEventListener('click', () => {
    questionContainer.classList.remove('hidden');
    initializeQuiz();
});

// Feedback form handling
const stars = document.querySelectorAll('.star');
const submitFeedback = document.getElementById('submit-feedback');
let selectedRating = 0;

// Star rating functionality
stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        selectedRating = rating;
        updateStars(rating);
    });
});

function updateStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        star.classList.toggle('active', starRating <= rating);
    });
}

// Handle feedback submission
submitFeedback.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comments = document.getElementById('comments').value;

    if (!name || !email) {
        alert('Please fill in your name and email');
        return;
    }

    // Here you would typically send this data to a server
    const feedbackData = {
        name,
        email,
        rating: selectedRating,
        comments,
        quizScore: score,
        totalQuestions: 10
    };

    console.log('Feedback submitted:', feedbackData);
    alert('Thank you for your feedback!');
    
    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('comments').value = '';
    selectedRating = 0;
    updateStars(0);
});

// Start the quiz
initializeQuiz();
