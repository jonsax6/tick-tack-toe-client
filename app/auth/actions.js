const store = require('../store')
const ui = require('./ui')

const wins = [
  [ 0, 1, 2 ],
  [ 0, 3, 6 ],
  [ 0, 4, 8 ],
  [ 1, 4, 7 ],
  [ 2, 4, 6 ],
  [ 2, 5, 8 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ]
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
  if (store.player === 'X') {
    store.player = 'O'
  } else {
    store.player = 'X'
  }
}

const getAllGames = () => {

  api.allGames(store.token)
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onFailure);
}


module.exports = {
  checkWin,
  checkTie,
  changePlayer,
  getAllGames
}
