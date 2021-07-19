const store = require('../store')

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
  let won = wins.some((win) => {
    win.every(i => {
      gameBoard[i] === n})
  })
  return won
}

const checkSideWin = (n) => {
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

const checkWin = (a, b) => {
  if (checkSideWin(a)) {
    store.winner = a
  } else if (checkSideWin(b)) {
    store.winner = b
  }
  return checkSideWin(a) || checkSideWin(b)
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
