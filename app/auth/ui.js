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
  $('#sign-up-form').trigger('reset')
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
  $('.game_row').show()
}

const onSignOutSuccess = () => {
  console.log("sign out success");
  $('#login-message').show();
  $('#login-message').text(`Thank you for playing!... Until next time.`);
  $('#sign-in').show();
  $('#sign-up').show();
  $('#sign-out-button').hide();
  // await setTimeout($('login-message').hide(), 5000)
  $('.game_row').hide();
  $('#sign-in-form').trigger("reset");
}

const onGameStartSuccess = (response) => {
  store.id = response.game._id
  console.log(store.id)
  console.log('new game created...')
  $("#sign-in-form").trigger("reset");
  $('.box_letter').text('')
  store.player = 'X'
}

module.exports = {
  onSignUpSuccess,
  onFailure,
  onSignInSuccess,
  onSignOutSuccess,
  onGameStartSuccess
};

// game: cells: (9)[("", "", "", "", "", "", "", "", "")];
// createdAt: "2021-07-17T18:28:26.055Z";
// over: false;
// owner: "60f1f95689991200172c55a2";
// updatedAt: "2021-07-17T18:28:26.055Z";
// __v: 0;
// _id: "60f3214ac0af3300174bdf5e";
