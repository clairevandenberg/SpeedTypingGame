window.addEventListener('load', init);

//Avaliable levels
const levels = {
    easy: 5,
    medium: 3, 
    hard: 2
}

//to change levels
const currentLevel = levels.easy;


// Global Varibles
//using let because we need to reassign time variable 
let time = currentLevel;
let score = 0
let isPlaying;


//Dom Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const easy = document.querySelector('#easy-btn');
const medium = document.querySelector('#medium-btn');
const hard = document.querySelector('#hard-btn');

//word array
const words = [
'lucky',
'developer',
'javascript',
'candle',
'nutrition',
'symptom',
'phone',
'bottle',
'computure',
'pencil',
'plant',
'runaway',
'magic',
'laughter',
'definition',
'stubborn',
'generate',
'establishment',
'hero',
'space',
'dog',
'fence',
'laundry',
'river',
'ocean',
'walk',
];


// Initialize Game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
  }

//Start Match 
function startMatch () {
if (matchWords()) {
    console.log('MATCH!!!')
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
}
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
}