```javascript
// ===============================
// FOOTBALL QUIZ - SCRIPT.JS
// ===============================

// Make sure your 100-question array is above this code.
// Example:
// const questions = [
//     { question: "...", options: ["A", "B", "C", "D"], answer: "A" }
// ];

let currentQuestion = 0;
let score = 0;
let answered = false;

// Get HTML elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const progressBar = document.querySelector(".progress-bar");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

// Display question
function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent =
        `${currentQuestion + 1}. ${current.question}`;

    optionsElement.innerHTML = "";

    current.options.forEach(option => {
        const button = document.createElement("button");

        button.classList.add("option");
        button.textContent = option;

        button.addEventListener("click", () => {
            selectAnswer(button, option);
        });

        optionsElement.appendChild(button);
    });

    // Update progress
    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    // Update score
    scoreElement.textContent = `Score: ${score}`;

    // Change next button
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish Quiz";
    } else {
        nextButton.textContent = "Next Question";
    }
}

// Check answer
function selectAnswer(button, selectedAnswer) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll(".option");

    if (selectedAnswer === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");

        // Show the correct answer
        allOptions.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add("correct");
            }
        });
    }

    scoreElement.textContent = `Score: ${score}`;
}

// Next question
nextButton.addEventListener("click", () => {

    if (!answered) {
        alert("Please choose an answer first!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show final result
function showResult() {

    quizElement.style.display = "none";
    resultElement.style.display = "block";

    finalScoreElement.textContent =
        `You scored ${score} out of ${questions.length}!`;

    progressBar.style.width = "100%";
}

// Restart quiz
restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;
    answered = false;

    quizElement.style.display = "block";
    resultElement.style.display = "none";

    showQuestion();
});

// Start quiz
showQuestion();
```
