var gPacman;
var PACMAN = '🙂';
// var isSuper = false;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {

  if (checkVictory()) {
    victorious()
    return;
  }

  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard

  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);

    if (checkVictory()) {
      victorious()
      return;
    }
  }

  // Hitting CHERRY, update score
  if (nextCell === CHERRY) {
    updateScore(10);

    if (checkVictory()) {
      victorious()
      return;
    }
  }

  // Hitting SUPER-FOOD
  if (gPacman.isSuper && nextCell === SUPER_FOOD) {
    return;
  } else if (nextCell === SUPER_FOOD) {
    gPacman.isSuper = true;
    updateScore(1);
    for (var i = 0; i < gGhosts.length; i++) {
      var ghost = gGhosts[i];
      document.querySelector(`.cell${ghost.location.i}-${ghost.location.j}`).innerHTML = `<span style="color:#ff0000;">${GHOST}</span>`;
    }
    if (checkVictory()) {
      victorious()
      return;
    }
    setTimeout(function () {
      gPacman.isSuper = false
      for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        document.querySelector(`.cell${ghost.location.i}-${ghost.location.j}`).innerHTML = `<span style="color:${ghost.color};">${GHOST}</span>`;
      }
      if (gGhosts.length === 0) {
        createGhost(gBoard);
        createGhost(gBoard);
        createGhost(gBoard);
      } else if (gGhosts.length === 1) {
        createGhost(gBoard);
        createGhost(gBoard);
      } else if (gGhosts.length === 2) {
        createGhost(gBoard);
      }
    }, 5000)
  }

  if (gPacman.isSuper && nextCell === GHOST) {
    updateScore(1);
    for (var i = 0; i < gGhosts.length; i++) {
      if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
        gGhosts.splice(i, 1)
      }
    }
  } else if (nextCell === GHOST) {
    gameOver()
    renderCell(gPacman.location, EMPTY);
    return;
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      faceDirection(1)
      break;
    case 'ArrowDown':
      nextLocation.i++;
      faceDirection(2)
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      faceDirection(3)
      break;
    case 'ArrowRight':
      nextLocation.j++;
      faceDirection(4)
      break;
    default: return null;
  }
  return nextLocation;
}

function faceDirection(direction) {
  if (direction === 1) {
    PACMAN = '🙃'
    renderCell(gPacman.location, PACMAN)
  } else if (direction === 2) {
    PACMAN = '🙂'
    renderCell(gPacman.location, PACMAN)
  } else if (direction === 3) {
    PACMAN = '<img src="img/left.png"; />'
    renderCell(gPacman.location, PACMAN)
  } else if (direction === 4) {
    PACMAN = '<img src="img/right.png"; />'
    renderCell(gPacman.location, PACMAN)
  }
}