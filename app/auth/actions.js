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

const aiPlayer = 'O'
const humanPlayer = 'X'

const checkPlayerWin = (board, n) => {
  winner = false
  wins.forEach(win => {
    if (
      board[win[0]] === n &&
      board[win[1]] === n &&
      board[win[2]] === n
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
  return checkPlayerWin(store.gameBoard, a) || checkPlayerWin(store.gameBoard, b)
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

const emptySquares = () => {
  let newArray = []
  store.gameBoard.forEach((c, index) => {
    if (c === '') {
      newArray.push(index)
    }
  })
  return newArray
}

function minimax(newBoard, player) {
  let availSpots = emptySquares()

  if (checkPlayerWin(newBoard, humanPlayer)) {
    return { score: -10 }
  } else if (checkPlayerWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  let moves = []
  for (let i = 0; i < availSpots.length; i++) {
    let move = {}
    move.index = newBoard[availSpots[i]]
    newBoard[availSpots[i]] = player

    if (player === aiPlayer) {
      let result = minimax(newBoard, humanPlayer)
      move.score = result.score
    } else {
      let result = minimax(newBoard, aiPlayer)
      move.score = result.score
    }

    newBoard[availSpots[i]] = move.index

    moves.push(move)
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }

  return moves[bestMove]
}

const turnClick = (index) => {
  if (store.gameBoard[index] === '') {
    turn(index, humanPlayer);
    if (!checkPlayerWin(store.gameBoard, humanPlayer) && !checkTie(store.gameBoard))
      turn(bestSpot(), aiPlayer);
  }
}

const turn = (id, player) => {
  store.gameBoard[id] = player
  $(`#box-${id}`).text(`${player}`)
  let isGameWon = checkPlayerWin(store.gameBoard, player)
  if (isGameWon) {
    store.gameWon = true
  }
}


const bestSpot = () => {
  return minimax(store.gameBoard, aiPlayer).index
}

module.exports = {
  checkWin,
  checkTie,
  changePlayer,
  getAllGames,
  minimax,
  turnClick
}
