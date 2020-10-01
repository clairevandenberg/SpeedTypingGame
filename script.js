window.addEventListener('load', startGame);

//Avaliable levels
const levels = {
    easy: 5,
    medium: 3, 
    hard: 2
}
//to change levels
const currentLevel = levels.hard;

// Global Varibles
//using let because we need to reassign time variable 
let time = currentLevel;
let score = 0
let isPlaying;
let answerWords = [];

//Dom Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const levelEasyBtn = document.querySelector('.easy-btn');
const levelMediumBtn = document.querySelector('.medium-btn');
const levelHardBtn = document.querySelector('.hard-btn');

const restart = document.querySelector(".restart")
const beforeStart = document.querySelector(".beforeStart");
const afterGame = document.querySelector(".afterGame");
const startBtn = document.querySelector(".startBtn");
const playAgainBtn = document.querySelector(".playAgain");
const duringGame = document.querySelector(".duringGame");


//  query word generator api
const queryWordApi = (words) => {
   
    //query URL
    let queryURL = `https://random-words2.p.rapidapi.com/${words}?limit=10&lang=en1`;

    //requesting words
$.ajax({
    "async": true,
    "crossDomain": true,
    url: queryURL,
    "method": "GET",
    "headers": {
    "x-rapidapi-host": "random-words2.p.rapidapi.com",
    "x-rapidapi-key": "6ac43da459msh7975326f9db54e2p107048jsn3294025369a7"
    },
    
    // if successful funciton will run
    success: (response) => {
    console.log(queryURL);

    //test     
    console.log(response)
    output.innerText = " ";

    //converting word array to lowercase
    response.forEach(words => {
        answerWords.push(words.toLowerCase());
    });

    //test words are lowercase
    console.log(answerWords);
},

// funciton to run on error
error: (xhr, status, error) => {
    console.log(`status: ${status}, Error: ${error}`);
}
});
}

// Initialize Game
function startGame() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(answerWords);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
  };

//Start Match 
function startMatch () {
beforeStart.classList.add("hidden");
duringGame.classList.remove("hidden");

if (matchWords()) {
    console.log('MATCH!!!')
    isPlaying = true;
    time = currentLevel + 1;
    showWord(answerWords);
    wordInput.value = '';
    score++;
}
//start -1 second to give user time to start on 0
if(score === -1) {
    scoreDisplay.innerHTML = 0;
} else {
    scoreDisplay.innerHTML = score;
}


}

//Match current word to the word input
function matchWords () {
if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
} else {
    message.innerHTML = '';
    return false;
}
}

//pick and show random word
function showWord(words) {
    //generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    //output a random word
        currentWord.innerHTML = words[randIndex];
    }

function countdown() {
    //check time so not run out
    if (time > 0) {
        // increase time
        time --;
    } else if (time === 0) {
        isPlaying = false;
    }
    //show time
    timeDisplay.innerHTML = time;
}

//check game status
function checkStatus () {
if (!isPlaying && time === 0 ) {
message.innerHTML = 'Game Over!!!';
score = -1
}
// //after Game
duringGame.classList.add("hidden");
// beforeStart.classList.remove("hidden");

};

// // attaching event listener to button 
startBtn.addEventListener("click", (event) => {
    startGame();
});

//restart game
const playAgain = (event) => {
        afterGame.classList.modal("hide");
        duringGame.classList.add("hidden")
        beforeStart.classList.remove("hidden");
};

//play easy 
const levelEasy = (event) => {
    startGame
    currentLevel = levels.hard;
}


//play medium 
const levelMedium = (event) => {
    startMatch => levels.hard;
}


//play hard 
const levelHard = (event) => {  
};


// startBtn.addEventListener("click", startGame);

// levelEasyBtn.addEventListener("click", (event) => {
//     init.currentLevel.levels.easy();
// });

// levelMediumBtn.addEventListener("click", (event) => {
//     init.currentLevel.levels.medium();
// });

// levelHardBtn.addEventListener("click", (event) => {
//     init.currentLevel.levels.hard();
// });

