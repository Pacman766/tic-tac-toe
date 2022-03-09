const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);
const restartButton = document.getElementById('restartButton');

let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true }); // click only once
  });
  setBorderHoverClass();
  winningMessageElement.classList.remove('show');
}

// add lightgrey color on hovering cell => if not checkWin - false - continue game, if draw - true - stop game,
// else - swap rurns and mark cell with color
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBorderHoverClass();
  }
}

// count steps
let count = 0;
const countMsg = document.querySelector('.count');

function counter() {
  cellElements.forEach((cell) =>
    cell.addEventListener('click', () => {
      count += 1;
      countMsg.innerText = `Steps: ${count}`
    })
  );
  return countMsg.innerText;
}
counter();

// show winning msg
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `Draw!`;
  } else {
    if (circleTurn) {
      winningMessageTextElement.innerText = `O's Wins!`;
    } else {
      winningMessageTextElement.innerText = `X's Wins!`;
    }
  }
  // `${circleTurn ? "O's" : "X's"} Wins!`
  winningMessageElement.classList.add('show');
}

// check if every cell is filled
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// add mark on a certain cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

//  elem with opacity on hobering cell
function setBorderHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// find if any winning combination === true => return - true , else - false
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// local storage


