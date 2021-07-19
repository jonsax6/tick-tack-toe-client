'use strict'
const store = require('../store')
let apiUrl

if (window.location.hostname === "localhost") {
  apiUrl = 'https://tic-tac-toe-api-development.herokuapp.com';
} else {
  apiUrl = "https://tic-tac-toe-api-production.herokuapp.com";
}

const signUp = (data) => {
  return $.ajax({
    method: 'POST',
    url: `${apiUrl}/sign-up`,
    data
  })
}

const signIn = (data) => {
  return $.ajax({
    method: 'POST',
    url: `${apiUrl}/sign-in`,
    data
  })
}

const signOut = () => {
  return $.ajax({
    url: `${apiUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token,
    },
  });
}

const gameStart = (data) => {
  return $.ajax({
    url: `${apiUrl}/games`,
    method: "POST",
    headers: {
      Authorization: "Bearer " + store.token,
    },
    data,
  });
}

const cellSelect = (data) => {
  return $.ajax({
    url: `${apiUrl}/games/${store.id}`,
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + store.token,
    },
    data,
  });
}

module.exports = {
  signUp,
  signIn,
  signOut,
  gameStart,
  cellSelect
}
