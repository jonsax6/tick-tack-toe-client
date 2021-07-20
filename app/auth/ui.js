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
  $('#user-message').show()
  $("#user-message").html(`<h4>Error... status: ${error.status}</h4>`);
  $('#sign-up-form').trigger('reset')
}

const onSignInFailure = (error) => {
  console.log(`Error, status: ${error.status}`)
  $('#login-title').hide()
  $('#user-login-message').show()
  $('#user-login-message').text('Account not found.  Try another account!')
}

const onSignInSuccess = (response) => {
  console.log('sign-in success')
  store.token = response.user.token
  store.user = response.user.email
  $('#username-display').text(`profile: ${store.user}`)
  $('#sign-in-form').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out-button').show()
  $('.game-row').show()
  $("#start-button-container").show();

}

const onSignOutSuccess = () => {
  console.log('sign out success')
  $('#login-title').hide()
  $('#user-login-message').show()
  $('#user-login-message').text(`Thank you for playing!... Until next time.`)
  $('#sign-in').show()
  $('#sign-up').show()
  $('.game-row').hide()
  $("#start-button-container").hide();
  $('#player-turn').hide()
  $('#sign-in-form').trigger('reset')
  $('#sign-out-button').hide()
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
  $("#player-turn").show();
  $('.message').hide()
  $('#start-button-container').hide()
  $('#game-board-title').show()
  $('.box').removeClass('box-game-over')
  $('.box').removeClass('box-game-tie')
  $('#box-0').removeClass('box-O, box-X')
  $('#box-1').removeClass('box-O, box-X')
  $('#box-2').removeClass('box-O, box-X')
  $('#box-3').removeClass('box-O, box-X')
  $('#box-4').removeClass('box-O, box-X')
  $('#box-5').removeClass('box-O, box-X')
  $('#box-6').removeClass('box-O, box-X')
  $('#box-7').removeClass('box-O, box-X')
  $('#box-8').removeClass('box-O, box-X')
  $('#box-0').empty()
  $('#box-1').empty()
  $('#box-2').empty()
  $('#box-3').empty()
  $('#box-4').empty()
  $('#box-5').empty()
  $('#box-6').empty()
  $('#box-7').empty()
  $('#box-8').empty()

  store.player = 'X'
  store.playing = true
  $('#player-turn').text(`It's your turn, ${store.player}...`)
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
  onGetAllGamesSuccess,
  onSignInFailure
}

// game: cells: (9) const gameBoard = ['X', '', '', '', 'X', '', '', '', 'X']
// createdAt: '2021-07-17T18:28:26.055Z'
// over: false
// owner: '60f1f95689991200172c55a2'
// updatedAt: '2021-07-17T18:28:26.055Z'
// __v: 0
// _id: '60f3214ac0af3300174bdf5e'
