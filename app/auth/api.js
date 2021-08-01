'use strict'
const store = require('../store')
const { apiUrl } = require('../config')

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
  })
}

const gameStart = (data) => {
  return $.ajax({
    url: `${apiUrl}/games`,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.token,
    },
    data,
  })
}

const cellFlip = (data) => {
  return $.ajax({
    url: `${apiUrl}/games/${store.id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.token,
    },
    data,
  })
}

const allGames = () => {
  return $.ajax({
    url: `${apiUrl}/games/`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.token,
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  gameStart,
  cellFlip,
  allGames
};
