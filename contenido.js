document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const questionSection = document.getElementById('question-section');
    const questionNumberDisplay = document.getElementById('question-number');
    const questionTextDisplay = document.getElementById('question-text');
    const optionsContainer = document.querySelector('.options');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const resultsSection = document.getElementById('results-section');
    const finalScoreDisplay = document.getElementById('final-score');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const restartButton = document.getElementById('restart-button');

    const questions = [
        {
            question: "¿Qué significa la palabra 'anfibio'?",
            options: ["A) Que vive solo en el agua", "B) Que vive en dos ambientes", "C) Que no tiene patas"],
            correctAnswer: "B"
        },
        {
            question: "¿Cuál de los siguientes NO es un anfibio?",
            options: ["A) Salamandra", "B) Tritón", "C) Lagarto"],
            correctAnswer: "C"
        },
        {
            question: "¿Cómo respiran las larvas de muchos anfibios?",
            options: ["A) Por pulmones", "B) Por branquias", "C) Por la piel"],
            correctAnswer: "B"
        },
        {
            question: "¿Qué proceso sufren muchos anfibios para transformarse en adultos?",
            options: ["A) Hibernación", "B) Metamorfosis", "C) Regeneración"],
            correctAnswer: "B"
        },
        {
            question: "¿Cuál es la piel de los anfibios generalmente?",
            options: ["A) Seca y escamosa", "B) Húmeda y permeable", "C) Dura y con pelo"],
            correctAnswer: "B"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionNumberDisplay.textContent = `Pregunta ${currentQuestionIndex + 1}`;
        questionTextDisplay.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Limpiar opciones anteriores

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = String.fromCharCode(65 + index) + ") " + option;
            button.dataset.answer = String.fromCharCode(65 + index);
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });

        updateNavigationButtons();
    }

    function selectAnswer(event) {
        const selectedOption = event.target;
        const userAnswer = selectedOption.dataset.answer;
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        // Deshabilitar todas las opciones después de seleccionar una
        document.querySelectorAll('.option').forEach(option => {
            option.removeEventListener('click', selectAnswer);
            if (option.dataset.answer === correctAnswer) {
                option.classList.add('correct');
            } else if (option === selectedOption) {
                option.classList.add('incorrect');
            }
        });

        if (userAnswer === correctAnswer) {
            score++;
        }

        // Habilitar el botón "Siguiente" después de seleccionar una respuesta
        nextButton.disabled = false;
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function prevQuestion() {
        currentQuestionIndex--;
        loadQuestion();
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.disabled = false; // Se habilita al cargar la pregunta, se deshabilita hasta seleccionar respuesta
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.textContent = 'Ver Resultados';
            nextButton.removeEventListener('click', nextQuestion);
            nextButton.addEventListener('click', showResults);
        } else {
            nextButton.textContent = 'Siguiente';
            nextButton.removeEventListener('click', showResults);
            nextButton.addEventListener('click', nextQuestion);
        }
    }

    function showResults() {
        questionSection.style.display = 'none';
        navigationButtons.style.display = 'none';
        resultsSection.style.display = 'block';
        finalScoreDisplay.textContent = score;
        totalQuestionsDisplay.textContent = questions.length;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultsSection.style.display = 'none';
        questionSection.style.display = 'block';
        navigationButtons.style.display = 'flex';
        nextButton.textContent = 'Siguiente';
        nextButton.removeEventListener('click', showResults);
        nextButton.addEventListener('click', nextQuestion);
        loadQuestion();
    }

    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);
    restartButton.addEventListener('click', restartQuiz);

    loadQuestion(); // Cargar la primera pregunta al iniciar
});
