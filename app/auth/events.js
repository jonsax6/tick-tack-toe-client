'use strict'
const getFormFields = require('../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const actions = require('./actions')

const onSignUp = (event) => {
  event.preventDefault()
  console.log('...in signup...')

  // get information from event and form
  const form = event.target
  const data = getFormFields(form)

  // make an API call using ajax
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  console.log('...in sign-in...')
  const form = event.target
  const data = getFormFields(form)
  console.log(data)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  store.stats = false
  console.log('...in sign-out...')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onFailure)
}

const onGameStart = (event) => {
  event.preventDefault()
  const newGame = '{}'
  api.gameStart(newGame)
    .then(ui.onGameStartSuccess)
    .catch(ui.onFailure)
}

const onGetGames = (event) => {
  event.preventDefault()
  api.allGames()
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onGetAllGamesFailure)
}

const onToggleStats = (event) => {
  event.preventDefault()
  store.stats = !store.stats
  if (store.stats) {
    $('#stats-title').show()
    $('#stats-table').show()
    $('#stats-btn').text('hide games')
  } else {
    $('#stats-title').hide()
    $('#stats-table').hide()
    $('#stats-btn').text('show games')
  }
}

const onToggleAi = (event) => {
  event.preventDefault()
  store.ai = !store.ai
  if (store.ai) {
    $('#play-ai-btn').text('AI')
  } else {
    $('#play-ai-btn').text('Human')
  }
}

const cellFlip = (index) => {
	// pass index to the box- divs, pass store.player to the box-letter- divs and populate the html to display CSS
	$(`#box-${index}`).removeClass(`box-O`)
	$(`#box-${index}`).removeClass(`box-X`)
	$(`#box-${index}`).addClass(`box-${store.player}`)
	console.log('...in cell flip...')
	console.log(store.player)
	$(`#box-${index}`).html(
		`<div class="row inner-box">
        <div class="col-12 box-letter-${store.player} letter-scaled"></div>
      </div>`
	)
	// now update the store state object's gameBoard on that index in the array
	store.gameBoard[index] = store.player

	// now check to see if there is a winner and save result to store.gameWon
	store.gameWon = actions.checkWin(store.gameBoard, 'X', 'O')

	// then check to see if there is a tie game and save result to store.gameTie
	store.gameTie = actions.checkTie(store.gameBoard)

	// checks if either win or tie is true, then changes gameOver to true if either returns true
	if (store.gameWon || store.gameTie) {
		store.gameOver = true
	}

	// if there's a winner, change the winning cells color to green, then reset game array and set playing to false
	if (store.gameWon) {
		store.winCase.forEach((box) => {
			$(`#box-${box}`).addClass('box-game-over')
		})

		$('#start-button-container').show()
		$('#play-ai-btn').show()
		$('#player-turn').hide()

		store.gameBoard = []
		store.playing = false
	}
	// if tie game, change board color to gray, then reset game array and set playing to false
	else if (store.gameTie) {
		$('.box').addClass('box-game-tie')
		$('#start-button-container').show()
		$('#player-turn').hide()
		store.gameBoard = []
		store.playing = false
	}
  // send the data object to the API PATCH call
	const data = {
		game: {
			cell: {
				index: index,
				value: store.player
			},
			over: store.gameOver,
		},
	}
	api.cellFlip(data)
    .then(ui.onCellFlipSuccess)
    .catch(ui.onFailure)
}

const onCellSelect = (event) => {
  event.preventDefault()
  // get the data from the function call object and bind to an index variable
  let index = event.data.index
  // shows the main title div in case it was hidden
  $('#game-board-title').show()
  // checks if the game has been won or tied, if so, displays message to start a new game
  if (store.gameWon || store.gameTie) {
    $('#player-turn').hide()
    $('#game-board-title-text').html('The game ended! Click "Start Game" below!')
  }
  // checks if a new game has been started if not, displays a user message to start a game
  else if (store.playing === false) {
    $('#player-turn').hide()
    $('#game-board-title-text').html('Click "Start Game" below to play a new game!')  }

  // checks to see if the cell is empty first, if so, then execute main function body
  else if (store.gameBoard[index] === '') {
    $('#game-board-title-text').html('Game On!')
    console.log("clicked..." + index)

    // initiate the cell change to 'X' or 'O', update state objects, checkWin, checkTie, change board color, change playing status
    cellFlip(index)

    // change the player in store.player object for next turn
    if (!store.gameWon && !store.gameTie) {
      actions.changePlayer()
      $('#player-turn').text(`Player ${store.player}... It's your turn.`)
    } else if (store.gameWon) {
      $('#player-turn').hide()
      $('#play-ai-btn').show()
      $('#game-board-title-text').text(`${store.player} Wins! Click 'start game' to play again.`)
    } else if (store.gameTie) {
      $('#player-turn').hide()
      $('#play-ai-btn').show()
      $('#game-board-title-text').text(`Stalemate! Click 'start game' to play again.`)

    }
    if (store.ai && store.player === 'O') {
      // execute an AI turn here
      index = actions.aiTurn(store.gameBoard)
      cellFlip(index)
      // console.log("the board after ai move is: " + store.gameBoard)
      // console.log("the player before change is: " + store.player);

      actions.changePlayer()
      // console.log("the player after change is: " + store.player);
    }
  }

  // if cell is occupied, user message displayed to choose again
  else {
    $('#game-board-title-text').html('That cell is already selected! Please try again!')
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onGameStart,
  onCellSelect,
  onGetGames,
  onToggleStats, 
  onToggleAi
}
