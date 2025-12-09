const questions = [
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C++", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheet", correct: false },
            { text: "Cascading Style Sheet", correct: true },
            { text: "Creative Style Syntax", correct: false },
            { text: "Colorful Styling Selector", correct: false },
        ]
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<header>", correct: false },
            { text: "<head>", correct: false },
        ]
    },
    {
        question: "What year was JavaScript created?",
        answers: [
            { text: "1991", correct: false },
            { text: "1995", correct: true },
            { text: "2000", correct: false },
            { text: "1989", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    loadQuestion();
}

function loadQuestion() {
    resetState();

    let current = questions[currentQuestionIndex];
    questionElement.textContent = current.question;

    current.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    updateProgress();
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });

    nextButton.style.display = "block";
}

function updateProgress() {
    let progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    progressBar.style.width = "100%";

    questionElement.textContent = `🎉 You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";

    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
