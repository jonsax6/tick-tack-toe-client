'use strict'
const token = require('./ui')
const store = require('../store')

const signUp = (data) => {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
    data
  })
}

const signIn = (data) => {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in',
    data
  })
}

const signOut = () => {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-out',
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + store.token,
    },
  });
}

module.exports = {
  signUp,
  signIn,
  signOut
}
