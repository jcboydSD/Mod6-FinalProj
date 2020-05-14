const coinTossButtons = document.querySelector('.coinTossButtons');
const coinTossResult = document.querySelector('#coinTossResult');
const winLossRecord = document.querySelector('#winLossRecord');
const quarterDisplay = document.querySelector('img');
const outcomes = ['Heads', 'Tails'];
const images = ['./img/heads.jpg', './img/tails.jpg'];
const winsLosses = [0,0];
const messages = ['You chose wisely!', 'Sorry, wrong choice'];

const tossCoin = function(prediction) {
    // convert guess string to number for comparison and ui update template
    let guessNum = 0; 
    if(prediction === 'tails') {
        guessNum = 1;
    } 
    flipAnimation(guessNum);
    // generate random number of either 0 or 1
    let tossResult = Math.round(Math.random());
    // compare guess and toss, update win/loss totals
    let winResult; // used with win/loss "messages" array
    if(guessNum === tossResult) {
        winsLosses[0]++;
        winResult = 0;        
    } else {
        winsLosses[1]++;
        winResult = 1;
    }
    // update ui after delay to allow for animation
    setTimeout(() => {
        quarterDisplay.src = images[tossResult];
        coinTossResult.innerHTML += `The toss is ${outcomes[tossResult]}<br>${messages[winResult]}`
        winLossRecord.innerHTML = `<br>Wins = ${winsLosses[0]}&nbsp&nbsp&nbsp&nbspLosses = ${winsLosses[1]}`;
    }, 1200)
};

const flipAnimation = function(guessNum) {
    coinTossResult.innerHTML = `You chose ${outcomes[guessNum]}<br>`;
    // winLossRecord content repeated here with additional <br> to preserve spacing during animation
    winLossRecord.innerHTML = `<br><br><br>Wins = ${winsLosses[0]}&nbsp&nbsp&nbsp&nbspLosses = ${winsLosses[1]}`;
    let side = 0;
    const flipper = function() {
        if(side === 20) {
            clearInterval(flipper);
        } else {
            side++;
            if(side % 2 === 0) {
                quarterDisplay.src = images[0];
            } else {
                quarterDisplay.src = images[1];
            }
        }
    }
    setInterval(flipper, 60);
};

coinTossButtons.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.className == 'coin') {
        tossCoin(e.target.id);
    }
});