/**
 * Interactive Tech & AI Knowledge Quiz
 * Modernized with dynamic progress tracking and immediate score evaluation
 */

const quizData = [
    {
        question: "What is the primary role of the 'temperature' parameter in Generative AI / LLMs?",
        options: [
            "Controls the randomness and creativity of generated tokens",
            "Adjusts the physical GPU processor speed",
            "Limits the maximum context window memory",
            "Determines the batch size during pre-training"
        ],
        answer: "Controls the randomness and creativity of generated tokens"
    },
    {
        question: "In Git, which command creates a new branch and immediately switches your working tree to it?",
        options: [
            "git checkout -b <branch-name>",
            "git branch -m <branch-name>",
            "git switch --detach <branch-name>",
            "git merge <branch-name>"
        ],
        answer: "git checkout -b <branch-name>"
    },
    {
        question: "In Test-Driven Development (TDD), what is the essential first phase of the cycle?",
        options: [
            "Write a test that fails before implementing code",
            "Write optimal production code first",
            "Refactor code before writing test specifications",
            "Deploy the feature to continuous integration"
        ],
        answer: "Write a test that fails before implementing code"
    },
    {
        question: "Which CSS layout mechanism is designed specifically for two-dimensional row and column layouts?",
        options: [
            "CSS Grid",
            "Flexbox",
            "Float",
            "Position absolute"
        ],
        answer: "CSS Grid"
    },
    {
        question: "What is the average time complexity of looking up a value by its key in a Hash Map / Object?",
        options: [
            "O(1) - Constant time",
            "O(n) - Linear time",
            "O(log n) - Logarithmic time",
            "O(n²) - Quadratic time"
        ],
        answer: "O(1) - Constant time"
    }
];

// App State
let currentQuestionIndex = 0;
let userScore = 0;
let isAnswerLocked = false;

// DOM References
const quizCard = document.getElementById("quiz");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const questionProgressText = document.getElementById("question-progress");
const scoreTrackerText = document.getElementById("score-tracker");
const progressBarFill = document.getElementById("progress-bar");

const resultSection = document.getElementById("result-box");
const resultEmoji = document.getElementById("result-emoji");
const resultHeading = document.getElementById("result-heading");
const resultDescription = document.getElementById("result");
const retryButton = document.getElementById("retry-btn");

const optionLabels = ["A", "B", "C", "D"];

function loadQuestion() {
    isAnswerLocked = false;
    const currentQ = quizData[currentQuestionIndex];

    // Update progress bar & counters
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    if (progressBarFill) {
        progressBarFill.style.width = `${progressPercent}%`;
    }
    if (questionProgressText) {
        questionProgressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    }
    if (scoreTrackerText) {
        scoreTrackerText.textContent = `Score: ${userScore}`;
    }

    // Set question prompt
    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = "";

    // Render interactive option buttons
    currentQ.options.forEach((optionText, idx) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-button";
        optionBtn.type = "button";

        const letterBadge = document.createElement("span");
        letterBadge.className = "option-letter";
        letterBadge.textContent = optionLabels[idx] || `${idx + 1}`;

        const textSpan = document.createElement("span");
        textSpan.className = "option-text";
        textSpan.textContent = optionText;

        optionBtn.appendChild(letterBadge);
        optionBtn.appendChild(textSpan);

        optionBtn.addEventListener("click", () => handleSelectOption(optionText, optionBtn));

        optionsContainer.appendChild(optionBtn);
    });
}

function handleSelectOption(selectedChoice, selectedBtn) {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    const currentQ = quizData[currentQuestionIndex];
    const isCorrect = selectedChoice === currentQ.answer;

    if (isCorrect) {
        userScore++;
        if (scoreTrackerText) {
            scoreTrackerText.textContent = `Score: ${userScore}`;
        }
    }

    // Advance to next question or complete quiz
    currentQuestionIndex++;

    setTimeout(() => {
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            displayFinalResults();
        }
    }, 280);
}

function displayFinalResults() {
    quizCard.classList.add("hidden");
    resultSection.classList.remove("hidden");

    let celebrationEmoji = "🎯";
    let statusTitle = "Quiz Completed!";
    let feedbackNote = "";

    if (userScore === quizData.length) {
        celebrationEmoji = "🔥";
        statusTitle = "Flawless Score!";
        feedbackNote = `Incredible work! You scored ${userScore} out of ${quizData.length} (100%). You have mastered these concepts!`;
    } else if (userScore >= 3) {
        celebrationEmoji = "🚀";
        statusTitle = "Great Job!";
        feedbackNote = `Solid performance! You scored ${userScore} out of ${quizData.length}. Keep sharpening those dev skills!`;
    } else {
        celebrationEmoji = "💡";
        statusTitle = "Keep Learning!";
        feedbackNote = `You scored ${userScore} out of ${quizData.length}. Review the concepts and try again to improve your score.`;
    }

    resultEmoji.textContent = celebrationEmoji;
    resultHeading.textContent = statusTitle;
    resultDescription.textContent = feedbackNote;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    isAnswerLocked = false;

    resultSection.classList.add("hidden");
    quizCard.classList.remove("hidden");

    loadQuestion();
}

if (retryButton) {
    retryButton.addEventListener("click", resetQuiz);
}

// Initialize on page load
loadQuestion();