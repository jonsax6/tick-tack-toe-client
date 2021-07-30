const store = require('../store')
const ui = require('./ui')
const api = require('./api')

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

const playerWins = (board, n) => {
  winner = false
  wins.forEach(win => {
    if (
      board[win[0]] === n &&
      board[win[1]] === n &&
      board[win[2]] === n
    ) {
      winner = true
      store.winCase = win
    }
  })
  return winner
}

const checkTie = (board) => {
  // if no empty cells, it's a tie
  return board.every(cell => cell !== '')
}

const checkWin = (board, a, b) => {
  // if player A wins (true) set the state object store.winner to a
  if (playerWins(board, a)) {
    store.winner = a
    // if player B wins, set state object
  } else if (playerWins(board, b)) {
    store.winner = b
  }
  // if either is the winner, return true for the game
  return playerWins(board, a) || playerWins(board, b)
}

const changePlayer = () => {
  store.player = store.player === 'X' ? 'O' : 'X'
}

const getAllGames = () => {
  api.allGames(store.token)
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onFailure)
}


// let gameBoard = ['X','','X','','X','O','','','']
// let gameWon = false


// Version 1 AI

// computer selects the very next open space (if space 0 is open it goes there, otherwise space 1, then space 2, etc)
// Version 2 AI

// computer selects randomly from the open spaces
// Version 3 AI

// computer looks for a winning move or a losing move and plays that first otherwise chooses random

// function to determine empty cells by index, returns an array of empty cells
const emptyCells = (board) => {
  // find all empty cells and save in new array.
  let availCells = []
  // scan each cell for ''.  if empty, push that cell's index into the new array.
  board.forEach((c, index) => {
    if (c === '') {
      availCells.push(index)
    }
  })
  return availCells
}

// if no AI win, scan each cell again, for each 'O' cell possibility, put an 'X' in each cell of the REMAINING available cells (for the next human turn).  If any of those results in a human win, then don't choose those.  Pick the cell that prevents a human win.

const edgeCases = [
  [0,1],
  [1,2],
  [0,2],
  [3,4],
  [4,5],
  [3,5],
  [6,7],
  [7,8],
  [6,8],
  [0,3],
  [3,6],
  [0,6],
  [1,4],
  [4,7],
  [1,7],
  [2,5],
  [5,8],
  [2,8],
  [0,4],
  [4,8],
  [0,8],
  [2,4],
  [4,6],
  [2,6],
]

const blockMove = [2,0,1,5,3,4,8,6,7,6,0,3,7,1,4,8,2,5,8,0,4,6,2,4]

const findBlockingMove = (board) => {
  // if there's no move to block, return null
  let move = null
  // check each edge case, see if those indexes are in the main board array...
  edgeCases.forEach((ec, index) => {
    if (board[ec[0]] === 'X' && board[ec[1]] === 'X' && board[blockMove[index]] === '') {
      // if so, then place the blockMove with corresponding index.
      move = blockMove[index]
    }
  })
  return move
}

const findAiWin = (board) => {
  let location = null
  // find all available cells and save to an array
  const availCells = emptyCells(board)
  console.log('...in findAiWin... Board is: ' + availCells)

  for (const cell of availCells) {
    // create a new temp variable based on the local copy using the ...spread so the original doesn't get changed.
    let tempBoard = board.slice(0)

    // try placing an 'O' at indexes from availCells
    tempBoard[cell] = 'O'

    // then check for win using checkWin
    let cellWin = playerWins(tempBoard, 'O')
    // if a cell placement wins, update store.gameBoard and store.gameWon then save cell to location variable and return that index
    if (cellWin) {
      store.gameBoard[cell] = 'O'
      location = cell
      return location
    }
  }
  // if no win is achieved, return null
  return location
}


// random integer from min to max.  includes min, excludes max
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

// chooses a radom cell from available spaces on a gameboard array.
const randomCell = (cells) => {
  const range = cells.length
  const index = getRndInteger(0, range)
  return cells[index]
}

// now using the above helper functions let's do a full AI turn
const aiTurn = (board) => {
  const aiWin = findAiWin(board)
  const winBlock = findBlockingMove(board)
  const availCells = emptyCells(board)
  let index
  console.log(board)
  // console.log(store.gameBoard)
  // console.log(aiWin)
  // console.log(winBlock)
  // console.log(availCells)
  // if there are no winning moves, and no wins to block, do random cell from available
  if (aiWin === null && winBlock === null) {
    console.log('...in random select...')
    // bind to index variable
    index = randomCell(availCells)
    // save the move to state object
    store.gameBoard[index] = 'O'
    return index
  }
  // if there is a win, make that the index
  else if (aiWin !== null) {
    console.log('...in aiWin...')
    index = aiWin
    store.gameBoard[index] = 'O'
    return index
  }
  // if there is a human win to block
  else if (winBlock !== null) {
    console.log('...in winBlock...')
    index = winBlock
    store.gameBoard[index] = 'O'  
    return index
  }
}

module.exports = {
  checkWin,
  playerWins,
  checkTie,
  changePlayer,
  getAllGames,
  aiTurn,
}
