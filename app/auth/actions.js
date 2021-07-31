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
  if (store.gameWon) { return null }
  else {
    edgeCases.forEach((ec, index) => {
      if (
        board[ec[0]] === 'X' &&
        board[ec[1]] === 'X' &&
        board[blockMove[index]] === ''
      ) {
        // if so, then place the blockMove with corresponding index.
        move = blockMove[index]
      }
    })
    return move
  }
}

const findAiWin = (board) => {
  let index = null
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
    // if a cell placement wins, update store.gameBoard and store.gameWon then save cell to index variable and return that index
    if (cellWin) {
      store.gameBoard[cell] = 'O'
      index = cell
      store.gameWon = true
      return index
    }
  }
  // if no win is achieved, return null
  return index
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

const cornerTest = (board) => {
  let number = 0
  const availCells = emptyCells(board)
  availCells.forEach(cell => {
    if (cell === 2 || cell === 6 || cell === 8) {
      number++
    } 
  })
  return number
}

const sideCorner = (board) => {
  let isSideCorner = false
  let numberOfXs = 0
  board.forEach(cell => {
    if (cell === 'X') {
      numberOfXs++
    }
  })
  if (numberOfXs === 2) {
    if (
    // test each case of a side and either opposite corner are 'X's
    ((board[1] === 'X' && board[6] === 'X') || (board[1] === 'X' && board[8] === 'X')) ||
    ((board[3] === 'X' && board[2] === 'X') || (board[3] === 'X' && board[8] === 'X')) ||     
    ((board[5] === 'X' && board[0] === 'X') || (board[5] === 'X' && board[6] === 'X')) ||
    ((board[7] === 'X' && board[0] === 'X') || (board[7] === 'X' && board[2] === 'X'))
    )
    {
      // if any side-corner case is true, we get into this expression body, if not, we return false below
      isSideCorner = true
      return isSideCorner
    }
  } else {
    return isSideCorner
  }
}

// now using the above helper functions let's do a full AI turn
const aiTurn = (board) => {
  const aiWin = findAiWin(board)
  const winBlock = findBlockingMove(board)
  const availCells = emptyCells(board)
  // test for the number of open corners
  let corners = cornerTest(board)
  let index
  console.log(store.level)

  // as the first priority, always check if there is a 'X' win to block
  if (winBlock !== null) {
		console.log('...in winBlock...')
		index = winBlock
		// store.gameBoard[index] = 'O'
		return index
	}
  // next check for a winning move
  else if (aiWin !== null) {
		console.log('...in aiWin...')
		index = aiWin
		// store.gameBoard[index] = 'O'
		return index
	}
	// if the middle is open during the second move, choose it
	else if (board[4] === '' && store.level === 'difficult') {
		index = 4
		return index
		// or, if the center is taken for first 'X' move, choose the first corner
	} else if (
    !store.gameWon &&
		board[4] === 'X' &&
		board[0] === '' &&
		store.level === 'difficult'
	) {
		index = 0
		return index
	}
	// if 'X' has middle and 'O' has one corner, take another corner
	else if (
    !store.gameWon &&
		board[4] === 'X' &&
		board[0] === 'O' &&
		(board[2] === '' || board[6] === '' || board[8] === '') &&
		corners >= 2 &&
		store.level === 'difficult'
	) {
		// this series returns the first open corner if directly above is true
		console.log('...yup...')
    if (!store.gameWon && board[2] === '') {
			index = 2
			return index
		} else if (!store.gameWon && board[6] === '') {
			index = 6
			return index
		} else if (!store.gameWon && board[8] ==='') {
			index = 8
			return index
		}
	} else if (store.level === 'difficult' && sideCorner(board)) {
    // now we need to choose an 'X' on a corner next to the side 'X'
    if (board[1] === 'X') {
      index = 2
      return index
    } else if (board[3] === 'X') {
      index = 0
      return index
    } else if (board[5] === 'X') {
      index = 2
      return index
    } else {
      index = 6
      return index
    }
  }
	// if no aiWin or no winBlock moves available, then just pick randomly
	else {
		console.log('...in random select...')
		// bind to index variable
		index = randomCell(availCells)
		// save the move to state object
		// store.gameBoard[index] = 'O'
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
