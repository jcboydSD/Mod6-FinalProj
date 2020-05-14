const form = document.querySelector('.user-guess');
const previousGuesses = document.querySelector('#previousGuesses');
const guessResult = document.querySelector('#guessResult');
let randomNumber = Math.floor(Math.random() * 100) + 1;
let userGuess;
let count = 0;

console.log(randomNumber);  // for testing purposes

const checkGuess = function(){
    guessResult.classList.remove('justRight', 'tooBig', 'tooSmall', 'tooMany');
    if(userGuess == randomNumber){
        guessResult.innerHTML = 'Congratulations! You got it right!';
        guessResult.classList.add('justRight');
        gameOver();
    }
    else if(count == 10){
        guessResult.innerHTML = '!!! Too many attempts, GAME OVER !!!';
        guessResult.classList.add('tooMany');
        gameOver();
    }    
    else {
        if(userGuess > randomNumber){
            guessResult.innerHTML = 'WRONG, that guess was too BIG';
            guessResult.classList.add('tooBig');
        }
        else {
            guessResult.innerHTML = 'Wrong, that guess was too small';
            guessResult.classList.add('tooSmall');
        }
    }
};

const gameOver = function(){
    document.getElementById('guess').disabled = true;
    document.querySelector('#guessGameOver').innerHTML = '<button id="guessButton">Start new game</button>'
    document.querySelector('#guessButton').focus();
    document.querySelector('#guessButton').addEventListener('click', () => {
        reset();  
    });  
};

const reset = function(){
    document.querySelector('#guessGameOver').innerHTML = '';
    count = 0;
    previousGuesses.innerHTML = '';
    guessResult.innerHTML = '';
    guessResult.classList.remove('justRight', 'tooMany');
    document.getElementById('guess').disabled = false;
    document.querySelector('#guess').focus();
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(randomNumber);  // for testing purposes
};

form.addEventListener('submit', e => {
    e.preventDefault();
    count ++;
    if(count==1){
        previousGuesses.innerHTML = 'Previous guesses: '
    }
    userGuess = Number(form.guess.value);
    form.guess.value = '';
    previousGuesses.innerHTML += (userGuess + '  ');
    checkGuess();
});