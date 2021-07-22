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
  const id = store.id
  api.allGames()
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onGetAllGamesFailure)
}

const onCellSelect = (event) => {
  event.preventDefault()
  // get the data from the function call object and bind to an index variable
  let index = event.data.index
  // shows the main title div in case it was hidden
  $('#game-board-title').show()
  // checks if a new game has been started if not, displays a user message to start a game
  if (store.playing === false) {
    $("#game-board-title").hide()
    $('.message').show()
    $('#user-message').html('<h4>Click "Start Game" below to play a new game!</h4>')
  }
  // checks if the game has been won or tied, if so, displays message to start a new game
  else if (store.gameWon || store.gameTie) {
    $("#game-board-title").hide();
    $('.message').show()
    $('#user-message').html('<h5>The game ended! Click "Start Game" below to play again!</h5>')
  }
  // checks to see if the cell is empty first, if so, then execute main function body
  else if (store.gameBoard[index] === '') {

    $(".message").hide()
    console.log("clicked..." + index)

    // initiate the cell change to 'X' or 'O', update state objects, checkWin, checkTie, change board color, change playing status
    actions.cellFlip(index)
    // make the API call
    actions.cellSelectApi(index)

    // change the player in store.player object for next turn
    if (!store.gameWon && !store.gameTie) {
      actions.changePlayer();
      $('#player-turn').text(`It's your turn, ${store.player}...`)
    } else if (store.gameWon) {
      $('#player-turn').text(`Congrats ${store.player}!! You are the winner!!`)
    } else if (store.gameTie) {
      $('#player-turn').text(`It's a stalemate! You've out matched each other...`)
    }
    if (store.ai && store.player === 'O') {
      // execute an AI turn here
      console.log(store.gameBoard)
      index = actions.aiTurn(store.gameBoard)
      console.log(index)
      console.log(store.gameBoard)
      actions.cellFlip(index)
      actions.cellSelectApi(index)
      // console.log("the board after ai move is: " + store.gameBoard)
      // console.log("the player before change is: " + store.player);

      actions.changePlayer()
      // console.log("the player after change is: " + store.player);
    }
  }

  // if cell is occupied, user message displayed to choose again
  else {
    $('#game-board-title').hide()
    $('.message').show()
    $('#user-message').html('<h4>That cell is already selected! Please try again!</h4>')
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onGameStart,
  onCellSelect,
  onGetGames
}
