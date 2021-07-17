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
  console.log('clicked...' + index)
  // add store.player to the box letter div
  $(`#box-letter-${index}`).text(store.player)
  store.gameBoard[index] = store.player

  // check to see if there is a winner
  const gameWon = actions.checkWin('X', 'O')

  // create the data object for the API PATCH
  const data = {
    game: {
      cell: {
        index: index,
        value: store.player,
      },
      over: gameWon,
    },
  }
  // change the player in store.player object for next turn
  actions.changePlayer()
  // send the data object to the API PATCH call
  api.cellSelect(data)
    // action for successful API PATCH
    .then(ui.onCellSelectSuccess)
    // action for failed API PATH
    .catch(ui.onFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onGameStart,
  onCellSelect
}
