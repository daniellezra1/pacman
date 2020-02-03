'use strict';
var WALL = '⬜';
var FOOD = '.';
var SUPER_FOOD = '🍩';
var CHERRY = '🍒';
var EMPTY = ' ';
var gIntervalCherry = null;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  document.querySelector('.modal-game-over').hidden = true;
  document.querySelector('.modal-victorious').hidden = true;
  gGame.score = 0
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  gIntervalGhosts = null;
  gIntervalCherry = null

  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;

  gIntervalCherry = setInterval(addCherry, 15000)
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if ((i === 1 && j === 1) || (i === 1 && j === 8) ||
        (i === 8 && j === 1) || (i === 8 && j === 8)) {
        board[i][j] = SUPER_FOOD
      } else if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function addCherry() {
  var emptyCells = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j] === EMPTY) {
        var currCell = { i: i, j: j }
        emptyCells.push(currCell)
      }
    }
  }
  var cell = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]
  gBoard[cell.i][cell.j] = CHERRY
  renderCell(cell, CHERRY)
}

function checkVictory() {
  var victory = true
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j] === FOOD || gBoard[i][j] === SUPER_FOOD) {
        victory = false
      }
    }
  }
  return victory
}

function gameOver() {
  document.querySelector('.modal-game-over').hidden = false;
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}

function victorious() {
  document.querySelector('.modal-victorious').hidden = false;
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}