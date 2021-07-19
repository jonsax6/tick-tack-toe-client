'use strict'
const store = require('../store')
const actions = require('./actions')

const onSignUpSuccess = (response) => {
  console.log('Sign-up success!')
  $('#sign-up-form').trigger('reset')
  $('#sign-up').hide()
}

const onFailure = (error) => {
  console.log(`Error, status: ${error.status}`)
  $('.message').show()
  $('#user-message').text(`Error... status: ${error.status}`)
  $('#sign-up-form').trigger('reset')
}

const onSignInSuccess = (response) => {
  console.log('sign-in success')
  store.token = response.user.token
  store.user = response.user.email
  $('.message').hide()
  $('#username-display').text(`profile: ${store.user}`)
  $('#sign-in-form').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out-button').show()
  $('.game_row').show()
  $('#new-game-button').show()

}

const onSignOutSuccess = () => {
  console.log('sign out success')
  $('.message').show()
  $('#user-message').text(`Thank you for playing!... Until next time.`)
  $('#sign-in').show()
  $('#sign-up').show()
  $('#sign-out-button').hide()
  // await setTimeout($('user-message').hide(), 5000)
  $('.game_row').hide()
  $('#sign-in-form').trigger('reset')
}

const onGetAllGamesSuccess = (response) => {
  console.log(response)
}

const onGameStartSuccess = (response) => {
  store.id = response.game._id
  store.gameBoard = response.game.cells
  store.gameWon = false
  store.gameTie = false
  store.gameOver = false
  console.log(store.id)
  console.log('new game created...')
  $('#sign-in-form').trigger('reset')
  $('.box-letter').text('')
  $('.message').hide()
  $('.box').removeClass('box-game-over')
  $('.box').removeClass('box-game-tie')

  store.player = 'X'
  store.playing = true
  $("#player-turn").text("It's your turn, " + store.player)
  // actions.getAllGames()
}

const onCellSelectSuccess = () => {
  console.log('API was pinged and board was updated!')
}

module.exports = {
  onSignUpSuccess,
  onFailure,
  onSignInSuccess,
  onSignOutSuccess,
  onGameStartSuccess,
  onCellSelectSuccess,
  onGetAllGamesSuccess
}

// game: cells: (9) const gameBoard = ['X', '', '', '', 'X', '', '', '', 'X']
// createdAt: '2021-07-17T18:28:26.055Z'
// over: false
// owner: '60f1f95689991200172c55a2'
// updatedAt: '2021-07-17T18:28:26.055Z'
// __v: 0
// _id: '60f3214ac0af3300174bdf5e'
