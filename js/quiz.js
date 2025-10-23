// --- CONFIGURATION START ---
const quizQuestions = [
    {
        question: "Aha atong first kiss?",
        answers: [
            { text: "sa ford everest", correct: false },
            { text: "sa ford pickup", correct: false },
            { text: "sa satellite xu", correct: true} ,
            { text: "sa engineering building ", correct: false }
        ]
    },
    {
        question: "Unsa nga date ta nagka uyab officially? grabe nagyud kung ma wrong ka",
        answers: [
            { text: "November 8, 2024", correct: true },
            { text: "November 8, 2023", correct: false },
            { text: "November 18, 2024", correct: false },
            { text: "December 8, 2023", correct: false }
        ]
    },
    {
        question: "Aha dire na butang ang dli hilig nako",
        answers: [
            { text: "PS5", correct: false },
            { text: "Sakyanan", correct: false },
            { text: "Bidet", correct: false },
            { text: "Elevator", correct: true }
        ]
    },
    {
        question: "ako bang naingon ang gusto nako iingon nimo before mag graduate ka? AHAHAHA",
        answers: [
            { text: "YESS", correct: false },
            { text: "No", correct: true },
          
        ]
    },
    {
        question: "What food ang dli gyud ta gaka sumhan",
        answers: [
            { text: "Raki Yata", correct: false },
            { text: "La Baia", correct: false },
            { text: "Chingkee", correct: false },
            { text: "Iao Iao", correct: true }
        ]
    },
    {
        question: "Aha ta gatambay sa XU Days before magsugod ang KPOP dance contest",
        answers: [
            { text: "Chapel", correct: true },
            { text: "Library", correct: false },
            { text: "Magis", correct: false },
            { text: "Field", correct: false }
        ]
    },
    {
        question: "Unsa imo ginote sa IG kadtong nagwatch ta og harry pottter (NO CHEATING HAHAHA)",
        answers: [
            { text: "Lami kayo mag rewatch og harry potter 😭", correct: true },
            { text: "Lami kayo mag rewatch harry potter", correct: false },
            { text: "Lami kayo mag rewatch og harry potter", correct: false },
            { text: "Lami kayo mutanaw og harry potter 😭 ", correct: false }
        ]
    },
    {
        question: "What was I most excited about during that XU Days event? TIP: if kung naread to nimo ang collage, ez ra kayo ni",
        answers: [
            { text: "Libre food", correct: false },
            { text: "Magwatch of KPOP dance contest", correct: false },
            { text: "Makadala nagyud ko og uyab and I enjoy ang event uban nimo", correct: true },
            { text: "Makig kita sa akong mga USTP friends", correct: false }
        ]
    },
    {
        question: "After your oath taking, what was I super happy about it TIP: if kung naread to nimo ang collage, ez ra kayo ni",
        answers: [
            { text: "Nag ila mi sa imong friends", correct: false },
            { text: "Imong gown so gorgeus kayo", correct: false },
            { text: "That my parents finally met you and your mother finally met me", correct: true },
        ]
    }
];
// --- CONFIGURATION END ---

const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.getElementById('quiz-feedback');
const progressBar = document.getElementById('progress');
const quizContainer = document.getElementById('quiz-container');
// The result container is no longer used, so the variable is removed.

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    // We also remove the logic for the result container here.
    quizContainer.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
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
        feedbackElement.innerText = "Yesss! Sakto jud ka! 🥰";
    } else {
        selectedBtn.classList.add('wrong');
        feedbackElement.innerText = "Oops! Not quite! 😅";
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true" && !isCorrect) {
             button.classList.add('correct');
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 1500); // Wait 1.5 seconds to show feedback before next action
}

function showScore() {
    // FIX: This function is now simplified.
    // Update progress bar to 100% at the end
    progressBar.style.width = `100%`;

    // Immediately redirect to the message page.
    // This happens after the 1.5-second delay from selectAnswer,
    // so the user will see the feedback on their last answer before redirecting.
    window.location.href = 'message.html';
}

// Ensure the quiz starts after the whole page is loaded
document.addEventListener('DOMContentLoaded', startQuiz);