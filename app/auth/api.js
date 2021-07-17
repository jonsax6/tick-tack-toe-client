'use strict'
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
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token,
    },
  });
}

const gameStart = (data) => {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/games',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.token,
    },
    data
  });
}

const cellSelect = (data) => {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/games/' + store.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.token,
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  gameStart,
  cellSelect
}
