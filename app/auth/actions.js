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

const checkWin = (board, a, b) => {
  if (checkPlayerWin(board, a)) {
    store.winner = a
  } else if (checkPlayerWin(board, b)) {
    store.winner = b
  }
  return checkPlayerWin(board, a) || checkPlayerWin(board, b)
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


// let gameBoard = ['X','','','','X','O','','','']
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
  let move = null
  edgeCases.forEach((ec, index) => {
    if (board[ec[0]] === 'X' && board[ec[1]] === 'X') {
      move = blockMove[index]
    }
  })
  return move
}

const findAiWin = (board) => {
  let location = null
  const availCells = emptyCells(board)
  const currentBoard = board

  for (const cell of availCells) {
    // create a new temp variable based on the local copy
    let tempBoard = [...currentBoard]
    // try placing an 'O' at indexes from availCells
    tempBoard[cell] = 'O'
    // then check for win using checkWin
    let cellWin = checkPlayerWin(tempBoard, 'O')
    // if a cell placement wins, update store.gameBoard and store.gameWon then save cell to location variable
    if (cellWin) {
      store.gameBoard[cell] = 'O'
      location = cell
      return location
    }
  }
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
    // bind to index variable
    index = randomCell(availCells)
    console.log('random index: ' + index)
    // save the move to state object
    store.gameBoard[index] = 'O'
    return index
  }
  // if there is a human win to block
  else if (winBlock !== null) {
    index = winBlock
    store.gameBoard[index] = 'O'
    return index
  } else if (aiWin !== null) {
    return aiWin
  }
}

const cellFlip = (index) => {
  // pass index to the box- divs, pass store.player to the box-letter- divs and populate the html to display CSS
  $(`#box-${index}`).removeClass(`box-O`);
  $(`#box-${index}`).removeClass(`box-X`);
  $(`#box-${index}`).addClass(`box-${store.player}`);
  $(`#box-${index}`).html(
    `<div class="row inner-box">
        <div class="col-12 box-letter-${store.player}"></div>
      </div>`
  );
  // now update the store state object's gameBoard on that index in the array
  store.gameBoard[index] = store.player;

  // now check to see if there is a winner and save result to store.gameWon
  store.gameWon = checkWin(store.gameBoard, 'X', 'O');

  // then check to see if there is a tie game and save result to store.gameTie
  store.gameTie = checkTie(store.gameBoard);

  // checks if either win or tie is true, then changes gameOver to true if either returns true
  if (store.gameWon || store.gameTie) {
    store.gameOver = true;
  }
  // if there's a winner, change the board color to green, then reset game array and set playing to false
  if (store.gameWon) {
    $('.box').addClass('box-game-over')
    $('#start-button-container').show()
    store.gameBoard = []
    store.playing = false
  }
  // if tie game, change board color to yellow, then reset game array and set playing to false
  else if (store.gameTie) {
    $('.box').addClass('box-game-tie')
    $('#start-button-container').show()
    store.gameBoard = []
    store.playing = false
  }
}

const cellSelectApi = (i) => {
  // create the data object for the API PATCH
  const data = {
    game: {
      cell: {
        index: i,
        value: store.player,
      },
      over: store.gameOver,
    },
  };
  // send the data object to the API PATCH call
  api
    .cellSelect(data)
    // action for successful API PATCH
    .then(ui.onCellSelectSuccess)
    // action for failed API PATH
    .catch(ui.onFailure)
}

// if none result in win or loss, then choose randomly.
module.exports = {
  checkWin,
  checkTie,
  changePlayer,
  getAllGames,
  aiTurn,
  cellFlip,
  cellSelectApi,
}
