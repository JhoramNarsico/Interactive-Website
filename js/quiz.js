// --- CONFIGURATION START ---
// Customize these questions! Add as many as you want.
const quizQuestions = [
    {
        question: "Aha atong first kiss?",
        answers: [
            { text: "La Baia", correct: true },
            { text: "In the car", correct: false },
            { text: "At the park", correct: false },
            { text: "Wait, we kissed?", correct: false }
        ]
    },
    {
        question: "What is my absolute favorite comfort food?",
        answers: [
            { text: "Pizza", correct: false },
            { text: "Ice Cream", correct: true },
            { text: "Tacos", correct: false },
            { text: "Sushi", correct: false }
        ]
    },
    {
        question: "What movie can I watch over and over without getting bored?",
        answers: [
            { text: "Mean Girls", correct: true },
            { text: "Die Hard", correct: false },
            { text: "The Godfather", correct: false },
            { text: "Shrek 2", correct: false }
        ]
    },
    {
        question: "If we could travel anywhere right now, where would I want to go?",
        answers: [
            { text: "Paris", correct: false },
            { text: "Japan", correct: true },
            { text: "Hawaii", correct: false },
            { text: "Italy", correct: false }
        ]
    }
];
// --- CONFIGURATION END ---

const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.getElementById('quiz-feedback');
const progressBar = document.getElementById('progress');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const finalMessage = document.getElementById('final-message');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Update progress bar
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    feedbackElement.innerText = '';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
        feedbackElement.innerText = "Yay! You got it right! 🥰";
    } else {
        selectedBtn.classList.add('wrong');
        feedbackElement.innerText = "Oops! Not quite! 😅";
    }

    // Disable all buttons after selection to prevent multiple guesses
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        // Highlight the correct answer if they got it wrong
        if (button.dataset.correct === "true" && !isCorrect) {
             button.classList.add('correct');
             button.style.opacity = "0.7"; // Make it slightly faded so they know which one they clicked
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 2000); // Wait 2 seconds before next question
}

function showScore() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    const scorePercent = (score / quizQuestions.length) * 100;
    scoreText.innerText = `You scored ${score} out of ${quizQuestions.length}!`;

    // Custom messages based on score
    if (scorePercent === 100) {
        finalMessage.innerText = "Perfect score! You know me better than anyone. I love you! ❤️";
    } else if (scorePercent >= 70) {
        finalMessage.innerText = "Pretty good! You definitely know your stuff. 😘";
    } else {
        finalMessage.innerText = "Well... maybe we need another date night to study? Just kidding! I love you anyway. 😉";
    }
}

// --- UPDATED AND MORE RELIABLE WAY TO START THE QUIZ ---
// This ensures the script waits for the HTML to be fully loaded before running.
document.addEventListener('DOMContentLoaded', startQuiz);