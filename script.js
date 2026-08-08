  const questions = [

    // MEMORY
    {
        category: "Working Memory",
        type: "memory",
        text: "Remember this sequence. Which letter was paired with 7?",
        visual: "K4   M7   P2   R9",
        answer: "M"
    },

    {
        category: "Working Memory",
        type: "memory",
        text: "Remember the sequence. What was the fourth item?",
        visual: "8   3   9   1   6   4",
        answer: "1"
    },

    // ATTENTION
    {
        category: "Selective Attention",
        type: "choice",
        text: "Which position contains the only different symbol?",
        visual: "○  ○  ○  ◉  ○  ○  ○",
        options: ["2", "3", "4", "5"],
        answer: "4"
    },

    {
        category: "Selective Attention",
        type: "input",
        text: "How many numbers are divisible by 3?",
        visual: "12   17   21   25   33   41   48",
        answer: "4"
    },

    // PATTERN
    {
        category: "Pattern Recognition",
        type: "input",
        text: "Find the next number.",
        visual: "2   6   12   20   30   ?",
        answer: "42"
    },

    {
        category: "Pattern Recognition",
        type: "input",
        text: "Find the next letter.",
        visual: "A   C   F   J   O   ?",
        answer: "U"
    },

    {
        category: "Pattern Recognition",
        type: "input",
        text: "Find the missing number.",
        visual: "3   8   18   38   78   ?",
        answer: "158"
    },

    // INHIBITION
    {
        category: "Cognitive Inhibition",
        type: "choice",
        text: "Ignore the word. Select the ink colour.",
        visual: "BLUE",
        options: ["RED", "BLUE", "GREEN", "YELLOW"],
        answer: "RED"
    },

    {
        category: "Cognitive Inhibition",
        type: "input",
        text: "Ignore the numbers. How many triangles do you see?",
        visual: "▲  7  ●  ▲  3  ▲  9  ●",
        answer: "3"
    },

    // LOGIC
    {
        category: "Logical Reasoning",
        type: "choice",
        text: "All programmers are problem solvers. Some students are programmers. What must be true?",
        options: [
            "All students are programmers",
            "Some students are problem solvers",
            "All problem solvers are programmers",
            "No students are problem solvers"
        ],
        answer: "Some students are problem solvers"
    },

    // SPATIAL
    {
        category: "Spatial Reasoning",
        type: "choice",
        text: "If NORTH rotates 90° clockwise to become EAST, where does WEST move?",
        options: ["NORTH", "SOUTH", "EAST", "WEST"],
        answer: "NORTH"
    },

    {
        category: "Spatial Reasoning",
        type: "choice",
        text: "A square is rotated 180°. Which side becomes opposite the original TOP?",
        options: ["TOP", "BOTTOM", "LEFT", "RIGHT"],
        answer: "BOTTOM"
    },

    // FLEXIBILITY
    {
        category: "Cognitive Flexibility",
        type: "choice",
        text: "NEW RULE: Odd numbers = LEFT. Even numbers = RIGHT. Where does 14 go?",
        options: ["LEFT", "RIGHT"],
        answer: "RIGHT"
    },

    {
        category: "Cognitive Flexibility",
        type: "choice",
        text: "NEW RULE: Letters before M = 1. Letters after M = 2. What is R?",
        options: ["1", "2"],
        answer: "2"
    },

    // HIGHER THINKING
    {
        category: "Higher-Order Thinking",
        type: "input",
        text: "A sequence follows this rule: 1→4, 2→9, 3→16, 4→25. What does 5 become?",
        answer: "36"
    },

    {
        category: "Higher-Order Thinking",
        type: "input",
        text: "Remove every vowel from COMPUTER. How many letters remain?",
        answer: "5"
    },

    // ADVANCED
    {
        category: "Advanced Reasoning",
        type: "input",
        text: "Find the missing number.",
        visual: `
            2   3   13<br>
            4   5   41<br>
            6   7   ?
        `,
        answer: "85"
    },

    {
        category: "Advanced Pattern",
        type: "input",
        text: "Find the next number.",
        visual: "1   2   6   24   120   ?",
        answer: "720"
    }
];

let availableQuestions = [];
let currentQuestion = null;
let score = 0;
let questionNumber = 0;
let memoryTimer = null;


// ========================================
// START
// ========================================

function startGame() {

    score = 0;
    questionNumber = 0;

    availableQuestions = [...questions];

    showNextQuestion();
}


// ========================================
// NEXT QUESTION
// ========================================

function showNextQuestion() {

    if (availableQuestions.length === 0) {
        availableQuestions = [...questions];
    }

    const randomIndex =
        Math.floor(Math.random() * availableQuestions.length);

    currentQuestion =
        availableQuestions.splice(randomIndex, 1)[0];

    questionNumber++;

    renderQuestion();
}


// ========================================
// DISPLAY QUESTION
// ========================================

function renderQuestion() {

    const q = currentQuestion;

    document.body.innerHTML = `

        <main class="game-container">

            <div class="game-card">

                <div class="game-top">
                    <span>${q.category}</span>
                    <span>Score: ${score}</span>
                </div>

                <h1>
                    Challenge ${questionNumber}
                </h1>

                <p class="question">
                    ${q.text}
                </p>

                ${
                    q.visual
                    ? `<div class="visual">${q.visual}</div>`
                    : ""
                }

                ${
                    q.type === "choice"
                    ? createOptions(q.options)
                    : `
                        <input
                            id="answerInput"
                            type="text"
                            placeholder="Enter your answer"
                        >

                        <br>

                        <button id="submitButton">
                            Submit
                        </button>
                    `
                }

                <div
                    id="feedback"
                    class="feedback">
                </div>

            </div>

        </main>
    `;

    if (q.type === "choice") {

        document
            .querySelectorAll(".option")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => checkAnswer(button.dataset.answer)
                );

            });

    } else {

        const input =
            document.getElementById("answerInput");

        const button =
            document.getElementById("submitButton");

        input.focus();

        button.addEventListener(
            "click",
            submitInput
        );

        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    submitInput();
                }

            }
        );
    }


    // Memory disappears
    if (q.type === "memory") {

        memoryTimer = setTimeout(() => {

            const visual =
                document.querySelector(".visual");

            if (visual) {
                visual.textContent = "❓";
            }

        }, 3000);
    }
}


// ========================================
// CREATE OPTIONS
// ========================================

function createOptions(options) {

    return `
        <div class="options">

            ${options.map(option => `

                <button
                    class="option"
                    data-answer="${option}">

                    ${option}

                </button>

            `).join("")}

        </div>
    `;
}


// ========================================
// INPUT ANSWER
// ========================================

function submitInput() {

    const input =
        document.getElementById("answerInput");

    if (!input.value.trim()) {
        return;
    }

    checkAnswer(input.value.trim());
}


// ========================================
// CHECK ANSWER
// ========================================

function checkAnswer(answer) {

    const feedback =
        document.getElementById("feedback");

    const correct =
        answer.toUpperCase() ===
        currentQuestion.answer.toUpperCase();

    if (correct) {

        score++;

        feedback.textContent =
            "✅ Correct! Next challenge...";

        feedback.style.color =
            "#4ade80";

        disableControls();

        setTimeout(() => {

            showNextQuestion();

        }, 1000);

    } else {

        endGame();
    }
}


// ========================================
// DISABLE CONTROLS
// ========================================

function disableControls() {

    document
        .querySelectorAll("button")
        .forEach(button => {

            button.disabled = true;

        });

    const input =
        document.getElementById("answerInput");

    if (input) {
        input.disabled = true;
    }
}


// ========================================
// GAME OVER
// ========================================

function endGame() {

    clearTimeout(memoryTimer);

    const best =
        Math.max(
            score,
            Number(
                localStorage.getItem("mindshiftBest") || 0
            )
        );

    localStorage.setItem(
        "mindshiftBest",
        best
    );

    document.body.innerHTML = `

        <main class="game-container">

            <div class="game-card">

                <div class="logo">
                    🧠
                </div>

                <h1>
                    Challenge Over
                </h1>

                <div class="score">
                    ${score}
                </div>

                <h2>
                    Correct answers in a row
                </h2>

                <p class="result-text">

                    One incorrect answer ended your run.

                    <br><br>

                    🏆 Best Score:
                    <strong>${best}</strong>

                </p>

                <button id="retryButton">
                    Try Again
                </button>

            </div>

        </main>
    `;

    document
        .getElementById("retryButton")
        .addEventListener(
            "click",
            startGame
        );
}


// ========================================
// HOME PAGE START BUTTON
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const startButton =
            document.getElementById("startButton");

        if (startButton) {

            startButton.addEventListener(
                "click",
                startGame
            );

        }

    }
);              
