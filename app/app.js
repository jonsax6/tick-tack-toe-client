// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events')
const store = require('./store')
const events = require('./auth/events')

$(() => {
  store.gameWon = false
  store.gameTie = false
  store.playing = false
  store.gameOver = false
  store.ai = false
  $("#sign-out-btn").hide();
  $('.game-row').hide()
  $("#start-button-container").hide()
  $('.message').hide()
  $('#user-message').hide()
  $('#user-login-message').hide()
  $('#sign-up-error').hide()
  $('.forms').show()
  $('#x-score').hide()
  $("#o-score").hide()
  $('#score-title').hide()
  $('#games-title').hide()
  $('#total-games-played').hide()
  $('#player-turn').hide()
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $("#sign-out-btn").on("click", authEvents.onSignOut);
  $('#new-game-button').on('click', authEvents.onGameStart)
  $('#box-0').on('click', { index: '0' }, authEvents.onCellSelect)
  $('#box-1').on('click', { index: '1' }, authEvents.onCellSelect)
  $('#box-2').on('click', { index: '2' }, authEvents.onCellSelect)
  $('#box-3').on('click', { index: '3' }, authEvents.onCellSelect)
  $('#box-4').on('click', { index: '4' }, authEvents.onCellSelect)
  $('#box-5').on('click', { index: '5' }, authEvents.onCellSelect)
  $('#box-6').on('click', { index: '6' }, authEvents.onCellSelect)
  $('#box-7').on('click', { index: '7' }, authEvents.onCellSelect)
  $('#box-8').on('click', { index: '8' }, authEvents.onCellSelect)
})
