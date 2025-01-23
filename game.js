let target;

const humanGuessInput = document.getElementById('human-guess');

const roundNumberDisplay = document.getElementById('round-number');

const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round')

nextRoundButton.addEventListener('click', () => {
  targetNumber = generateTarget();
  advanceRound();
  roundNumberDisplay.innerText = currentRoundNumber;
  targetNumberDisplay.innerText = '?';
  humanGuessInput.value = '';
  guessButton.innerText = 'Make a Guess';
  guessButton.removeAttribute('disabled');
  nextRoundButton.setAttribute('disabled', true);
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  document.getElementById('user-wins-message').innerText = ''; // Clear user win message
});

const resetButton = document.getElementById('reset');

// Reset button logic
resetButton.addEventListener('click', () => {
  // Reset scores
  humanScore = 0;
  computerScore = 0;
  currentRoundNumber = 1;

  // Update displays
  humanScoreDisplay.innerText = 0;
  computerScoreDisplay.innerText = 0;
  roundNumberDisplay.innerText = currentRoundNumber;

  // Reset game state
  targetNumberDisplay.innerText = '?';
  humanGuessInput.value = '';
  guessButton.innerText = 'Make a Guess';
  guessButton.classList.remove('winning-text');
  guessButton.removeAttribute('disabled');
  nextRoundButton.setAttribute('disabled', true);
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
});

guessButton.addEventListener('click', () => {
  // Generate the target value
  target = generateTarget();
  // Retrieve the player's guess
  const currentHumanGuess = humanGuessInput.value;
  // Make a random 'computer guess'
  const computerGuess = Math.floor(Math.random() * 10);

  // Display the computer guess and the target
  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;
  
  // Determine if the human or computer wins:
  const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)
  const winner = humanIsWinner ? 'human' : 'computer'

  // Update the correct score:
  updateScore(winner);

  // Display the winner
  if (humanIsWinner) {
    const userWinsMessage = document.getElementById('user-wins-message');
    userWinsMessage.innerText = 'You Win!!!!! Congratulations!';
    userWinsMessage.style.color = '#4caf50'; // Green for a win
    guessButton.classList.add('winning-text'); // Optional styling
  } else {
    computerWinsDisplay.innerText = 'Computer Wins!!!';
    computerWinsDisplay.classList.add('computer-wins-text');
  }  

  // Display the current scores:
  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;
  
  // Set the correct disabled state for the buttons
  guessButton.setAttribute('disabled', true)
  nextRoundButton.removeAttribute('disabled');
});

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
  const currentValue = parseInt(humanGuessInput.value);
  humanGuessInput.value = currentValue + 1;
  handleValueChange(parseInt(humanGuessInput.value));
});

subtractButton.addEventListener('click', () => {
  const currentValue = parseInt(humanGuessInput.value);
  humanGuessInput.value = currentValue - 1;
  handleValueChange(parseInt(humanGuessInput.value));
});

document.addEventListener('DOMContentLoaded', () => {
  handleValueChange(parseInt(humanGuessInput.value));
});


const handleValueChange = value => {
  if (value > 0 && value <= 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value > 9) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
};

humanGuessInput.addEventListener('input', function(e) {
  handleValueChange(e.target.value);
});
