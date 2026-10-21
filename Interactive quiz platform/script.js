
const questions = [
    {
        question: "Which language is used to structure a web page?",
        answers: ["CSS", "HTML", "Python", "SQL"],
        correct: 1
    },
    {
        question: "Which language is used to style a web page?",
        answers: ["Java", "C++", "CSS", "PHP"],
        correct: 2
    },
    {
        question: "Which language makes a web page interactive?",
        answers: ["JavaScript", "HTML", "SQL", "XML"],
        correct: 0
    },
    {
        question: "Which HTML tag is used to create a link?",
        answers: ["<p>", "<img>", "<h1>", "<a>"],
        correct: 3
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answers: ["<!-- -->", "//", "**", "##"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const numberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const answerButtons = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    numberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    questionElement.textContent = q.question;
    answerButtons.innerHTML = "";
    feedbackElement.textContent = "";

    progressElement.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See Results"
            : "Next Question →";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && index !== correctIndex) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        feedbackElement.textContent = "Correct! Well done!";
        feedbackElement.style.color = "#059669";
    } else {
        feedbackElement.textContent =
            `Incorrect! The correct answer is ${
                questions[currentQuestion].answers[correctIndex]
            }.`;

        feedbackElement.style.color = "#dc2626";
    }

    scoreElement.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function showResults() {
    quizBox.hidden = true;
    resultBox.hidden = false;

    progressElement.style.width = "100%";

    document.getElementById("final-score").textContent =
        `Your Score: ${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;
    let message;

    if (percentage === 100) {
        message = "Excellent! You got every question right!";
    } else if (percentage >= 60) {
        message = "Great job! Keep learning!";
    } else {
        message = "Good try! Practice and try again!";
    }

    document.getElementById("result-message").textContent = message;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;

    resultBox.hidden = true;
    quizBox.hidden = false;

    showQuestion();
});

showQuestion();
