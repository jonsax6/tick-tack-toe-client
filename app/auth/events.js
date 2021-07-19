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

  // to be used later for auto sign-in
  // const email = data.credentials.email
  // const password = data.credentials.password
  // const signInData = {
  //   credentials: {
  //     email: `${email}`,
  //     password: `${password}`
  //   }
  // }
  // console.log(signInData)

  // make an API call using ajax
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  console.log('...in sign-in...')
  const form = event.target
  const data = getFormFields(form)
  console.log(data)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onFailure)
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

const onCellSelect = (event) => {
  event.preventDefault()
  // get the data from the function call object and bind to an index variable
  const index = event.data.index
  // checks if a new game has been started if not, displays a user message to start a game
  if (store.playing === false) {
    $(".message").show();
    $("#user-message").text('Click "New Game" to play a new game!')
  }
  // checks if the game has been won, if so, displays message to start a new game
  else if (store.gameWon === true) {
    $('.message').show()
    $('#user-message').text('The game ended! Click "Start Game" to play again!')
  }
  // checks to see if the cell is empty first, if so, then execute main function body
  else if (store.gameBoard[index] === '') {
    $(".message").hide()
    console.log("clicked..." + index)
    // add store.player to the box letter div
    $(`#box-letter-${index}`).text(store.player)
    store.gameBoard[index] = store.player

    // check to see if there is a winner
    store.gameWon = actions.checkWin('X', 'O')
    console.log(store.gameBoard)
    console.log('game won? ' + store.gameWon)
    if (store.gameWon) {
      $('.box').addClass('box-game-over')
      store.gameBoard = []
      store.playing = false
    }
    // create the data object for the API PATCH
    const data = {
      game: {
        cell: {
          index: index,
          value: store.player,
        },
        over: store.gameWon,
      },
    }
    // send the data object to the API PATCH call
    api.cellSelect(data)
      // action for successful API PATCH
      .then(ui.onCellSelectSuccess)
      // action for failed API PATH
      .catch(ui.onFailure)

    // change the player in store.player object for next turn
    if (!store.gameWon) {
      $('#player-turn').text(`It's your turn, ${store.player}...`)
    } else if (store.gameWon) {
      $('#player-turn').text(`congrats ${store.player}!! you are the winner!!`)
    }
    actions.changePlayer()
  }
  // if cell is occupied, user message displayed to choose again
  else {
    $('.message').show()
    $('#user-message').text('That cell is already selected! Please try again!')
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onGameStart,
  onCellSelect
}
