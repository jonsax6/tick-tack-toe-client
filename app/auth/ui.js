'use strict'
const store = require('../store')
const actions = require('./actions')
const events = require('./events')
const api = require('./api')

const onSignUpSuccess = (response) => {
  console.log('Sign-up success!')
  $('#sign-up-form').trigger('reset')
  $('#sign-up').hide()
  $('#login-title').text('Thank you! You can sign-in now...')
  $('#sign-up-error').hide()
  $('#sign-up-welcome').show()
}

const onSignUpFailure = () => {
  $('#sign-up-error').show()
  $('#sign-up-welcome').hide()
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
  $('#x-score').show()
  $('#o-score').show()
  $('#stats-btn').show()
  $('#games-title').show()
  $('#total-games-played').show()
  $('.forms').hide()
  $('#score-title').show()
  $("#sign-out-btn").show();
  $('.game-row').show()
  $('#player-turn').show()
  $('#start-button-container').show()
  $('#sign-up-error').hide()
  $('#sign-up-welcome').show()
  $('#player-turn').hide()
  $('#btn-ai').show()
  $('#btn-level').show()
  api.allGames()
    .then(onGetAllGamesSuccess)
    .catch(onGetAllGamesFailure)
}

const onSignOutSuccess = () => {
  console.log('sign out success')
  $('.box').empty()
  $('#username-display').empty()
  $('#x-wins').text('-')
  $('#o-wins').text('-')
  $('#x-score').hide()
  $('#o-score').hide()
  $('.forms').show()
  $('#score-title').hide()
  $('#player-turn').empty()
  $('#login-title').hide()
  $('#games-title').hide()
  $('#btn-ai').hide()
  $('#btn-level').hide()
  $('#total-games-played').hide()
  $('#user-login-message').show()
  $('#game-board-title-text').text("Let's Play Some Tick Tack Toe!")
  $('#user-login-message').text(`Thank you for playing! Until next time...`)
  $('#user-login-message').fadeOut(4000)
  $('#login-title').show(4200)
  $('#sign-up-email').empty()
  $('#sign-up-password').empty()
  $('#sign-in').show()
  $('#sign-up').show()
  $('.game-row').hide()
  $('#start-button-container').hide()
  $('#player-turn').hide()
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
  $('#sign-out-btn').hide()
  $('#stats-btn').hide()
  $('#stats-title').hide()
  $('#stats-table').hide()
  $('#btn-ai').hide()
  $('#btn-level').hide()
  $('#stats-btn').text('show games')
  $('.box').removeClass('box-game-over')
  $('.box').removeClass('box-game-tie')
  $('#box-0').removeClass('box-O')
  $('#box-1').removeClass('box-O')
  $('#box-2').removeClass('box-O')
  $('#box-3').removeClass('box-O')
  $('#box-4').removeClass('box-O')
  $('#box-5').removeClass('box-O')
  $('#box-6').removeClass('box-O')
  $('#box-7').removeClass('box-O')
  $('#box-8').removeClass('box-O')
  $('#box-0').removeClass('box-X')
  $('#box-1').removeClass('box-X')
  $('#box-2').removeClass('box-X')
  $('#box-3').removeClass('box-X')
  $('#box-4').removeClass('box-X')
  $('#box-5').removeClass('box-X')
  $('#box-6').removeClass('box-X')
  $('#box-7').removeClass('box-X')
  $('#box-8').removeClass('box-X')
  $('#play-ai-btn').text('Human')
  $('#level-ai-btn').text('Easy')
  store.gameBoard = []
  store.playing = false
  store.ai = false
  store.level = 'easy'
}

const onGetAllGamesSuccess = (response) => {
  let xWins = []
  let oWins = []
  store.games = response.games
  store.games.forEach((game) => {
    let oldBoard = game.cells;
    if (actions.playerWins(oldBoard, "X")) {
      xWins.push(oldBoard);
    } else if (actions.playerWins(oldBoard, "O")) {
      oWins.push(oldBoard);
    }
  });
  $('#x-wins').text(`${xWins.length}`)
  $('#o-wins').text(`${oWins.length}`)
  $('#total-games-played').text(`${store.games.length}`)

  $('#stats-body').empty()
  const gamesReversed = store.games.slice(0)
  gamesReversed.reverse()
  console.log('...reversed...')
  console.log(gamesReversed)
  let gameNum = store.games.length
  gamesReversed.forEach((game, index) => {
    let created = Date.parse(game.createdAt)
    const monthsArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let dateObj = new Date(created)
    let year = dateObj.getFullYear()
    let month = monthsArr[dateObj.getMonth()]
    let day = dateObj.getDate()
    let hour = dateObj.getHours()
    let minutes = dateObj.getMinutes()
    let amPm 
    amPm = hour < 12 ? 'AM' : 'PM'
    hour = hour > 12 ? hour - 12 : hour
    minutes = minutes < 10 ? '0' + minutes : minutes
    let oldBoard = game.cells
    let winner = 'none'
    if (actions.playerWins(oldBoard, 'X')) {
      winner = 'X won'
    } else if (actions.playerWins(oldBoard, "O")) {
      winner = 'O won'
    }
    $('#stats-body').append(
			`
      <tr>
        <th scope="row">${gameNum}</th>
        <td>${game._id}</td>
        <td>${month} ${day} ${year}  ${hour}:${minutes} ${amPm}</td>
        <td>${winner}</td>
      </tr>
      `
		)
    gameNum--
  })

  console.log(xWins.length)
  console.log(oWins.length)
  console.log(store.games)
  console.log(response)
  console.log(store.id)
}

const onGetAllGamesFailure = (error) => {
  console.log(error)
}

const onGameStartSuccess = (response) => {
  store.id = response.game._id
  store.gameBoard = response.game.cells
  store.gameWon = false
  store.gameTie = false
  store.gameOver = false
  console.log(store.id)
  console.log('new game created...')
  $("#game-board-title-text").text(`Let's Play Some Tick Tack Toe!`)
  $('#sign-in-form').trigger('reset')
  $("#player-turn").show();
  $('.message').hide()
  $('#start-button-container').hide()
  $('#game-board-title').show()
  $('#btn-ai').hide()
  $('#btn-level').hide()
  $('.box').removeClass('box-game-over')
  $('.box').removeClass('box-game-tie')
  $('#box-0').removeClass('box-O')
  $('#box-1').removeClass('box-O')
  $('#box-2').removeClass('box-O')
  $('#box-3').removeClass('box-O')
  $('#box-4').removeClass('box-O')
  $('#box-5').removeClass('box-O')
  $('#box-6').removeClass('box-O')
  $('#box-7').removeClass('box-O')
  $('#box-8').removeClass('box-O')

  $('#box-0').removeClass('box-X')
  $('#box-1').removeClass('box-X')
  $('#box-2').removeClass('box-X')
  $('#box-3').removeClass('box-X')
  $('#box-4').removeClass('box-X')
  $('#box-5').removeClass('box-X')
  $('#box-6').removeClass('box-X')
  $('#box-7').removeClass('box-X')
  $('#box-8').removeClass('box-X')
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

const onCellFlipSuccess = () => {
  console.log('API was pinged and board was updated!')
  if(store.gameOver) {
    api.allGames()
    .then(onGetAllGamesSuccess)
    .catch(onGetAllGamesFailure);
  }
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onFailure,
  onSignInSuccess,
  onSignOutSuccess,
  onGameStartSuccess,
  onCellFlipSuccess,
  onGetAllGamesSuccess,
  onGetAllGamesFailure,
  onSignInFailure
}

// game: cells: (9) const gameBoard = ['X', '', '', '', 'X', '', '', '', 'X']
// createdAt: '2021-07-17T18:28:26.055Z'
// over: false
// owner: '60f1f95689991200172c55a2'
// updatedAt: '2021-07-17T18:28:26.055Z'
// __v: 0
// _id: '60f3214ac0af3300174bdf5e'
