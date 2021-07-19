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
  // shows the main title div in case it was hidden
  $('#game-board-title').show()
  // checks if a new game has been started if not, displays a user message to start a game
  if (store.playing === false) {
    $("#game-board-title").hide()
    $('.message').show()
    $('#user-message').html('<h4>Click "New Game" to play a new game!</h4>');
  }
  // checks if the game has been won or tied, if so, displays message to start a new game
  else if (store.gameWon || store.gameTie) {
    $("#game-board-title").hide();
    $('.message').show()
    $('#user-message').html('<h4>The game ended! Click "Start Game" to play again!</h4>')
  }
  // checks to see if the cell is empty first, if so, then execute main function body
  else if (store.gameBoard[index] === '') {
    $(".message").hide()
    console.log("clicked..." + index)
    // add store.player to the box letter div
    $(`#box-letter-${index}`).text(store.player)
    // now update the store state object's gameBoard on that index in the array
    store.gameBoard[index] = store.player

    // now check to see if there is a winner and save result to store.gameWon
    store.gameWon = actions.checkWin('X', 'O')

    // then check to see if there is a tie game and save result to store.gameTie
    store.gameTie = actions.checkTie(store.gameBoard)

    // checks if either win or tie is true, then changes gameOver to true if either returns true
    if (store.gameWon || store.gameTie) {
      store.gameOver = true
    }

    // if there's a winner, change the board color to green, then reset game array and set playing to false
    if (store.gameWon) {
      $('.box').addClass('box-game-over')
      store.gameBoard = []
      store.playing = false
    }
    // if tie game, change board color to yellow, then reset game array and set playing to false
    else if (store.gameTie) {
      $('.box').addClass('box-game-tie')
      store.gameBoard = []
      store.playing = false
    }

    // now create the data object for the API PATCH
    const data = {
      game: {
        cell: {
          index: index,
          value: store.player,
        },
        over: store.gameOver,
      },
    }
    // send the data object to the API PATCH call
    api.cellSelect(data)
      // action for successful API PATCH
      .then(ui.onCellSelectSuccess)
      // action for failed API PATH
      .catch(ui.onFailure)

    // change the player in store.player object for next turn
    if (!store.gameWon && !store.gameTie) {
      $('#player-turn').text(`It's your turn, ${store.player}...`)
      actions.changePlayer()
    } else if (store.gameWon) {
      $('#player-turn').text(`Congrats ${store.player}!! You are the winner!!`)
    } else if (store.gameTie) {
      $('#player-turn').text(`It's a stalemate! You've out matched each other...`)
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
  onCellSelect
}
