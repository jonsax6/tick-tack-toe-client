'use strict'
const store = require('../store')
const actions = require('./actions')
const events = require('./events')
const api = require('./api')

const onSignUpSuccess = (response) => {
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
  $('#user-message').show()
  $("#user-message").html(`<h4>Error... status: ${error.status}</h4>`);
  $('#sign-up-form').trigger('reset')
}

const onSignInFailure = (error) => {
  $('#login-title').hide()
  $('#user-login-message').show()
  $('#user-login-message').text('Account not found.  Try another account!')
}

const onSignInSuccess = (response) => {
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
  $('#login-title').text('Login to Tick Tack Toe:')
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
  // arrays for the scoreboard, array.length will give the correct score for X and O
  let xWins = []
  let oWins = []
  // create a state object for the returned games array
  store.games = response.games

  store.games.forEach((game) => {
    // variable for just the board cells in the old game
    const oldBoard = game.cells
    // new board variable making sure all letters are upper case, 
    // to account for other user accounts that may have lower case letters
    const oldBoardNormalized = oldBoard.map(cell => cell.toUpperCase())
    // check for the winner for this old game by running checkWin helper function
    if (actions.playerWins(oldBoardNormalized, 'X')) {
      // if winner is X, push to the xWins array
      xWins.push(oldBoardNormalized);
    } else if (actions.playerWins(oldBoardNormalized, 'O')) {
      // if winner is O, push to the oWins array
      oWins.push(oldBoardNormalized);
    }
  })
  $('#x-wins').text(`${xWins.length}`)
  $('#o-wins').text(`${oWins.length}`)
  $('#total-games-played').text(`${store.games.length}`)

  // now start populating the game stats table
  // first empty any old data so we have a clean slate
  $('#stats-body').empty()
  // reverse the array so most recent game is at the top
  const gamesReversed = store.games.slice(0)
  gamesReversed.reverse()

  // start at all the games played, then decrement at the bottom so that we count downwards
  let gameNum = store.games.length

  // iterate each game and populate the table 
  gamesReversed.forEach((game) => {
    // game creation date
    let created = Date.parse(game.createdAt)
    
    // variable indexing months to convert month number to it's 3 letter string
    const monthsArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    
    // create a javascript Date object from the Date prototype
    let dateObj = new Date(created)

    // pull out the year from the dateObj
    let year = dateObj.getFullYear()

    // pull out the month from the dateObj, then convert into 3 letter string by putting that number
    // as the index in the monthsArr array
    let month = monthsArr[dateObj.getMonth()]

    // pull out the day from the dateObj
    let day = dateObj.getDate()

    // pull out the hour from the dateObj
    let hour = dateObj.getHours()

    // pull out the minutes from the dateObj
    let minutes = dateObj.getMinutes()

    // declare am/pm variable
    let amPm 

    // if hour is more than 12 set amPm to PM, otherwise make it AM
    amPm = hour < 12 ? 'AM' : 'PM'

    // if the hour number is greater than 12, subtract 12 for non-military time
    hour = hour > 12 ? hour - 12 : hour

    // make sure the minutes format is two digits (for 0 - 9)
    minutes = minutes < 10 ? '0' + minutes : minutes

    // pull out the game cells for this game we are currently iterating
    let oldBoard = game.cells

    // declare winner variable
    let winner

    // find an X or O winner, or make it a tie
    if (actions.playerWins(oldBoard, 'X')) {
      winner = 'X won'
    } else if (actions.playerWins(oldBoard, "O")) {
      winner = 'O won'
    } else if (actions.checkTie(oldBoard)) {
      winner = 'Tie'
    } 
    // if game is incomplete return 'none'
    else {
      winner = 'none'
    }

    // now populate the table one game at a time for each iteration of this forEach loop
    $('#stats-body').append(
			`
      <tr>
        <th scope="row">${gameNum}</th>
        <td>${month} ${day} ${year}  ${hour}:${minutes} ${amPm}</td>
        <td>${winner}</td>
      </tr>
      `
		)

    // decrement the game number so we show highest number first then descending down git 
    gameNum--
  })
}

const onGetAllGamesFailure = (error) => {
}

const onGameStartSuccess = (response) => {
  store.id = response.game._id
  store.gameBoard = response.game.cells
  store.gameWon = false
  store.gameTie = false
  store.gameOver = false
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
  $('#player-turn').text(`Player ${store.player}... It's your turn.`)
  // actions.getAllGames()
}

const onCellFlipSuccess = () => {
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
