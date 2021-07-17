const store = require('../store')

const board = store.gameBoard

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
  return wins.some(win => {
    win.every(cell => board[cell] === n)
  })
}

const checkWin = (a, b) => {
  return checkPlayerWin(a) || checkPlayerWin(b)
}

const changePlayer = () => {
  if (store.player === 'X') {
    store.player = 'O'
  } else {
    store.player = 'X'
  }
}

module.exports = {
  checkWin,
  changePlayer
}
