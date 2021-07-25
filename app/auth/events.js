'use strict'
const getFormFields = require('../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const actions = require('./actions')

const onSignUp = (event) => {
  event.preventDefault()
  console.log('...in signup...')

  // get information from event and form
  const form = event.target
  const data = getFormFields(form)

  // make an API call using ajax
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  console.log('...in sign-in...')
  const form = event.target
  const data = getFormFields(form)
  console.log(data)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  store.stats = false
  console.log('...in sign-out...')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onFailure)
}

const onGameStart = (event) => {
  event.preventDefault()
  const newGame = '{}'
  api.gameStart(newGame)
    .then(ui.onGameStartSuccess)
    .catch(ui.onFailure)
}

const onGetGames = (event) => {
  event.preventDefault()
  api.allGames()
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onGetAllGamesFailure)
}

const onToggleStats = (event) => {
  event.preventDefault()
  store.stats = !store.stats
  if (store.stats) {
    $('#stats-title').show()
    $('#stats-table').show()
    $('#stats-btn').text('hide games')
  } else {
    $('#stats-title').hide()
    $('#stats-table').hide()
    $('#stats-btn').text('show games')
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
  }
  // send the data object to the API PATCH call
  console.log(data)
  console.log(store.token)
  api
    .cellSelect(data)
    // action for successful API PATCH
    .then(ui.onCellSelectSuccess)
    // .then(api.allGames)
    // .then(ui.onGetAllGamesSuccess)

    // action for failed API PATH
    .catch(ui.onFailure)
}

const onResumeGame = (event) => {

}

const onCellSelect = (event) => {
  event.preventDefault()
  // get the data from the function call object and bind to an index variable
  let index = event.data.index
  // shows the main title div in case it was hidden
  $('#game-board-title').show()
  // checks if the game has been won or tied, if so, displays message to start a new game
  if (store.gameWon || store.gameTie) {
    $('#player-turn').hide()
    $('#game-board-title-text').html('The game ended! Click "Start Game" below!')
  }
  // checks if a new game has been started if not, displays a user message to start a game
  else if (store.playing === false) {
    $('#player-turn').hide()
    $('#game-board-title-text').html('Click "Start Game" below to play a new game!')  }

  // checks to see if the cell is empty first, if so, then execute main function body
  else if (store.gameBoard[index] === '') {
    $('#game-board-title-text').html('Game On!')
    console.log("clicked..." + index)

    // initiate the cell change to 'X' or 'O', update state objects, checkWin, checkTie, change board color, change playing status
    actions.cellFlip(index)
    // make the API call
    cellSelectApi(index)

    // change the player in store.player object for next turn
    if (!store.gameWon && !store.gameTie) {
      actions.changePlayer();
      $('#player-turn').text(`Player ${store.player}... It's your turn.`)
    } else if (store.gameWon) {
      $('#player-turn').hide()
      $('#game-board-title-text').text(`${store.player} Wins! Click 'start game' to play again.`)
    } else if (store.gameTie) {
      $('#player-turn').hide()
      $('#game-board-title-text').text(`Stalemate! Click 'start game' to play again.`)

    }
    if (store.ai && store.player === 'O') {
      // execute an AI turn here
      console.log(store.gameBoard)
      index = actions.aiTurn(store.gameBoard)
      console.log(index)
      console.log(store.gameBoard)
      actions.cellFlip(index)
      cellSelectApi(index)
      // console.log("the board after ai move is: " + store.gameBoard)
      // console.log("the player before change is: " + store.player);

      actions.changePlayer()
      // console.log("the player after change is: " + store.player);
    }
  }

  // if cell is occupied, user message displayed to choose again
  else {
    $('#game-board-title-text').html('That cell is already selected! Please try again!')
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onGameStart,
  onCellSelect,
  onGetGames,
  onToggleStats
}
