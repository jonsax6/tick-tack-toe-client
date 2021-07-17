'use strict'
const store = require('../store')

const onSignUpSuccess = (response) => {
  console.log('Sign-up success!')
  $('#sign-up-form').trigger('reset')
  $('#sign-up').hide()
}

const onFailure = (error) => {
  console.log(`Error, status: ${error.status}`)
  $('#login-message').show()
  $('#login-message').text(`Error... status: ${error.status}`)
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  console.log('signin success')
  store.token = response.user.token
  store.user = response.user.email
  $('#username-display').text(`profile: ${store.user}`)
  $('#sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out-button').show()
  $('.game_row').show()
}

const onSignOutSuccess = async () => {
  console.log("sign out success");
  $('#login-message').show();
  $('#login-message').text(`Thank you for playing!... Until next time.`);
  $('#sign-in').show();
  $('#sign-up').show();
  $('#sign-out-button').hide();
  // await setTimeout($('login-message').hide(), 5000)
  $('.game_row').hide();
  $('#sign-in').trigger("reset");
}

module.exports = {
  onSignUpSuccess,
  onFailure,
  onSignInSuccess,
  onSignOutSuccess
}
