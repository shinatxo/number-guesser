let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;
let targetNumber = generateTarget();

// Write your code below:

function generateTarget() {
    return Math.floor(Math.random() * 10); // generates a random number between 0 and 9
}

function getAbsoluteDistance(num1, num2) {
    return Math.abs(num1 - num2);
}

function compareGuesses(humanGuess, computerGuess, targetNumber) {
    const humanDifference = getAbsoluteDistance(targetNumber, humanGuess);
    const computerDifference = getAbsoluteDistance(targetNumber, computerGuess);
    return humanDifference <= computerDifference;
}

// updates score based on the winner

function updateScore(winner) {
    if (winner === 'human') {
        humanScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
}

function advanceRound() {
    currentRoundNumber++;
}


// Input validation and event listener
const humanGuessInput = document.getElementById('human-guess');
const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const roundNumberDisplay = document.getElementById('round-number');
const targetNumberDisplay = document.getElementById('target-number');
const computerGuessDisplay = document.getElementById('computer-guess');
const computerWinsDisplay = document.getElementById('computer-wins');

const validateInput = () => {
    const value = humanGuessInput.value;
    if (value < 0 || value > 9 || isNaN(value)) {
      guessButton.setAttribute('disabled', true);
      alert('Please enter a number between 0 and 9');
      return false;
    } else {
      guessButton.removeAttribute('disabled');
    }
  };
  
humanGuessInput.addEventListener('input', validateInput);

guessButton.addEventListener('click', () => {
    const humanGuess = parseInt(humanGuessInput.value);
    const computerGuess = generateTarget();
    const isHumanWinner = compareGuesses(humanGuess, computerGuess, targetNumber);
    const winner = isHumanWinner ? 'human' : 'computer';
    updateScore(winner);
    humanScoreDisplay.innerText = humanScore;
    computerScoreDisplay.innerText = computerScore;
    computerGuessDisplay.innerText = computerGuess;
    computerWinsDisplay.innerText = winner === 'computer' ? 'Computer Wins!' : '';
    nextRoundButton.removeAttribute('disabled');
});



nextRoundButton.addEventListener('click', () => {
    targetNumber = generateTarget();
    advanceRound();
});
  