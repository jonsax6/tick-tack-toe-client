[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tick Tack Toe

A simple tick tack toe game.  Allows users to sign-up for an account, sign-in, start and play games, and sign-out.

## Technologies used for this app

* This app was deployed using General Assembly's basic browser template.
* It was built using html, css and javascript.  
* This is an SPA with no front-end framework involved (i.e. React or Angular).
* Bootstrap was used for the styling choices.
* The API endpoints are hosted at Heroku and managed by General Assembly.

### development story

* The app was initially planned with a wireframe:
  
*  ![wireframe page 1](https://i.imgur.com/SqjPoHy.jpg) 

*  ![wireframe page 2](https://i.imgur.com/zPVvBms.jpg)

* pseudo-code was written to plan basic functionality for:
  * sign-up form
  * sign-in form
  * sign-out button
  * functions to check for game win scenarios, tie games, and change player.
  * helper functions
  * Computer player algorithm

* js files were organized into the following structure: 
  * events.js to handle event listener functions.
  * ui.js to handle the changes to the ui from resulting events being triggered. 
  * api.js to store all the ajax api call functions.
  * actions.js to handle any miscellaneous helper functions
* The basic game layout was scaffolded using bootstrap
* The game layout was wired-up with the appropriate class and id element attributes.
* All API endpoints were tested using curl scripts.
* Sign-in, sign-out, and sign-up were coded first, all APIs were logged and verified.
* Gameboard CSS was coded to get the basic stylings in place
* Gameboard functionality was tested prior to API integration.
  * clicking on cells to get the 'X' or 'O' to print to the board.
  * error handling when game hasn't started but a cell is clicked.
  * error handling when clicking on a cell that is already populated.
  * error handling when clicking on the board if the game is won or tied.
  * game-play functions coded and tested to check for a win or tie.
  * game-play function coded and tested to change players back and forth from X to O every turn.
  * CSS classes created for win-cases or the tie case.  Win turns board green, tie turns the board yellow.
  * win message to user coded, tie message to user coded.
  * during all phases of development, making sure the correct divs were hidden/shown for each different page view.
  * making sure that any lingering 'session-specific' html elements or text was removed upon sign-out using jquery's $.empty() method.
* bugs/problems usually solved with careful observation of the order of events, simplifying with console.logs, and reading error codes for guidance locating the bugs.

### Stretch Goals Attained

* implemented a toggle-able past games stats table, most recent game first
  * table stats include: game number, date and time, and winner
* created two difficulty levels for the computer player, an easy and a difficult level
* computer player/human player and difficulty level are both toggles 
* implemented a scoreboard with number of 'X' and 'O' wins as well as total games played for user account
* Created CSS classes that turn the board win cells to green, or entire board to gray if tie game
    
### Future Stretch Goals

* Click on a past game to show the board as it was in it's final state
