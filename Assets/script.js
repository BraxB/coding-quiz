// TODO build function for timer
// TODO build next question function
// build function for answering with if statement with different behavior depending on answer true or false

var startEl = document.getElementById('start-btn');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer-grid');

// variable to loop over the questions
let qIndex = 0;


// when clicked the start button hides itself and begins displaying the question and answer elements
startEl.addEventListener('click', startGame);

function startGame() {
    startEl.classList.add('hide');
    answerEl.style.display = 'grid';
    setQuestion(qIndex);
}

function setQuestion(question) {
    questionEl.textContent = questions[qIndex].question;
    questions[qIndex].answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        // button.addEventListener('click', selectAnswer);
        answerEl.appendChild(button);
    })
}

// function resetAnswers() {
//     answerEl.remove(children);
// }

// created an array of objects for each question
var questions = [
    {
        question:'Commonly used data types do NOT include',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false},
            { text: 'alerts', correct: true},
            { text: 'functions', correct: false}
        ]
    },
    {
        question:'The condition in an if/else statement is enclosed within _____.',
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false},
            { text: 'parenthesis', correct: true},
            { text: 'square brackets', correct: false}
        ]
    },
    {
        question:'Arrays in JavaScript can be used to store',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false},
            { text: 'booleans', correct: false},
            { text: 'all of the above', correct: true}
        ]
    },
    {
        question:'String values must be enclosed within _____ when being assigned to variables',
        answers: [
            { text: 'commas', correct: false },
            { text: 'curly brackets', correct: false},
            { text: 'quotes', correct: true},
            { text: 'parenthesis', correct: false}
        ]
    },
    {
        question:'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: 'console.log', correct: true},
            { text: 'terminal/bash', correct: false},
            { text: 'for loops', correct: false},
            { text: 'JavaScript', correct: false}
        ]
    }
]