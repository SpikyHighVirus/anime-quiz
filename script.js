// Quiz data
const questions = [
    {
        question: "Who is the protagonist of 'Naruto'?",
        options: ["Naruto Uzumaki", "Sasuke Uchiha", "Kakashi Hatake"],
        answer: 0
    },
    {
        question: "What is the name of Goku's Saiyan home planet?",
        options: ["Earth", "Namek", "Vegeta"],
        answer: 2
    },
    {
        question: "Which anime features the 'Straw Hat Pirates'?",
        options: ["One Piece", "Fairy Tail", "Bleach"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const scoreSection = document.getElementById('score-section');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

// Function to load the current question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = ''; // Clear previous options
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => selectAnswer(li, index); // Pass the clicked list item (li) to highlight it
        optionsElement.appendChild(li);
    });
    nextButton.classList.add('hidden'); // Hide Next button initially
}

// Function to handle answer selection
function selectAnswer(selectedOption, selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].answer;

    // Highlight the selected option
    const options = optionsElement.querySelectorAll('li');
    options.forEach(option => option.classList.remove('selected')); // Remove highlight from all options
    selectedOption.classList.add('selected'); // Add highlight to the selected option

    // Check if the answer is correct
    if (selectedIndex === correctIndex) {
        score++; // Increment score if correct answer is selected
    }
    
    nextButton.classList.remove('hidden'); // Show Next button after selecting an answer
}

// Function to move to the next question
nextButton.onclick = () => {
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
        nextButton.classList.add('hidden'); // Hide Next button again before answering
    } else {
        showScore(); // If all questions are answered, show the score
    }
};

// Function to show the score at the end of the quiz
function showScore() {
    questionElement.classList.add('hidden');
    optionsElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    scoreSection.classList.remove('hidden');
    scoreElement.textContent = `${score} / ${questions.length}`;
}

// Function to restart the quiz
function restartQuiz() {
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
    scoreSection.classList.add('hidden');
    questionElement.classList.remove('hidden');
    optionsElement.classList.remove('hidden');
    nextButton.classList.remove('hidden');
    loadQuestion(); // Load the first question
}

// Event listener for restart button
restartButton.onclick = () => restartQuiz();

// Start the quiz by loading the first question
loadQuestion();
