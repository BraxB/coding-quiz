var startEl = document.getElementById('start-btn');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer-grid');
var timerEl = document.getElementById('timer');

// variable to loop over the questions
let qIndex = 0;
let score = 0;
let timer = 60;

timerEl.textContent = timer;

// when clicked the start button hides itself and begins displaying the question and answer elements
startEl.addEventListener('click', startGame);

//function that displays the q&a objects and initializes timer after start is pressed. 
function startGame() {
    startEl.classList.add('hide');
    answerEl.style.display = 'grid';
    score = 0;
    var timerInterval = setInterval(function() { 
        timer--; 
        timerEl.textContent = timer;
    
        if (timer === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
    setQuestion(qIndex);
}

//sets the next question or ends the game if the next question is undefined
function setQuestion(question) {
    if (questions[qIndex] === undefined) {
        endGame();
    }
    else {
        questionEl.textContent = questions[qIndex].question;
        questions[qIndex].answers.forEach(answer => {
            var button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerEl.appendChild(button);
        })
    }
}

// this function removes answers from the previous question and must be called whenever a new q&a object is set
function resetAnswers() {
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild);
    }
}

//allows user to select an answer and sets behavior on whether answer is correct or not
function selectAnswer(e) {
    var selectedButton = e.target;
    if (selectedButton.dataset.correct) {
        score = score + 100;
        qIndex++;
        resetAnswers();
        setQuestion(qIndex);
    }
    else {
        qIndex++;
        timer = timer - 15;
        resetAnswers();
        setQuestion(qIndex)
    }
}

// the following code will end the game when conditions are met and present user with elements to log their score or view high scores
function endGame() {
    resetAnswers();
    timerEl.classList.add('hide');
    questionEl.textContent = "Great job! Type your initials below to log your score.";

    // following section contains functionality to log score
    var initialsInput = document.createElement('input');
    var logBtn = document.createElement('button');
    answerEl.appendChild(initialsInput);
    answerEl.appendChild(logBtn);
    logBtn.setAttribute('class', 'btn');
    logBtn.innerText = 'Enter';
    logBtn.addEventListener('click', logScore);
    function logScore() {
        key = initialsInput.value
        if (key == '') {
           alert('Please enter your initials') 
        }
        else {
            localStorage.setItem(key, score);
        }
    }
    
    // creates the necessary elements and functions to view scores
    var viewScores = document.createElement('button');
    viewScores.addEventListener('click', showScores);
    viewScores.setAttribute('class', 'btn');
    viewScores.innerText = 'View High Scores';
    answerEl.appendChild(viewScores);

    function showScores() {
        var highScoresTable = document.createElement('ol');
        answerEl.appendChild(highScoresTable);
        var scores = Object.entries(localStorage);
        for (i = 0; i < Object.entries(localStorage).length; i++) {
            var liEl = document.createElement('li');
            liEl.textContent = scores[i];
            highScoresTable.appendChild(liEl);
        }
        viewScores.classList.add('hide');
    }

}

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