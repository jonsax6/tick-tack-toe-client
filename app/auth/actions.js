const store = require('../store')
const ui = require('./ui')

const wins = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 6, 4, 2 ]
]

const checkPlayerWin = (n) => {
  winner = false
  wins.forEach(win => {
    if (
      store.gameBoard[win[0]] === n &&
      store.gameBoard[win[1]] === n &&
      store.gameBoard[win[2]] === n
    ) {
      winner = true
    }
  })
  return winner
}

const checkTie = (board) => {
  return board.every(cell => cell !== '')
}

const checkWin = (a, b) => {
  if (checkPlayerWin(a)) {
    store.winner = a
  } else if (checkPlayerWin(b)) {
    store.winner = b
  }
  return checkPlayerWin(a) || checkPlayerWin(b)
}

const changePlayer = () => {
  store.player = store.player === 'X' ? 'O' : 'X'
  // if (store.player === 'X') {
  //   store.player = 'O'
  // } else {
  //   store.player = 'X'
  // }
}

const getAllGames = () => {

  api.allGames(store.token)
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onFailure);
}

function minimax(newBoard, player) {
  var availSpots = emptySquares();

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}


module.exports = {
  checkWin,
  checkTie,
  changePlayer,
  getAllGames
}
