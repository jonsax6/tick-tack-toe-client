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
  * during all phases of development, making sure the correct divs were hidden/show for each different page view.
* bugs/problems usually solved with careful observation of the order of events, simplifying with console.logs, and reading error codes for guidance locating the bugs.

### Unsolved problems

* Tracking score for total number of games
* change password feature

Developers should set `apiUrls.production` and `apiUrls.development` in
[`app/config.js`](app/config.js).  With
`apiUrls` set, developers may rely on `apiUrl` as the base for API
URLs.

### Styles

Developers should store styles in [`app/styles`](app/styles) and load them
from [`app/styles/index.scss`](app/styles/index.scss). Bootstrap version 3 is
included in this template.

### Forms and Using `getFormFields`

Developers should use [getFormFields](get-form-fields.md) to retrieve form data
to send to an API.

### Deployment

To deploy a browser-template based SPA, run `grunt deploy`.

## Adding Images

To add images to your project, you must store them in the `public` directory.
To use the image in HTML or CSS, write the path to the image like this:

```html
<img src="public/cat.jpg">
```
or
```css
#my-cool-div {
  background-image: url('public/cat.jpg')
}
```

Note that there's no `./` or `/` in front of `public/filename.jpg`.

## Adding Fonts

To add custom fonts to your app, you can either use a CDN like Google Fonts, or
you can download the fonts and save them in the `public` directory. If you use
the former method, follow the directions on the website providing the fonts.

For local fonts, put the files in `public`, and then import and use them in a
`.scss` file like this:

```scss
@font-face {
  font-family: 'Nature Beauty';
  src: url('public/Nature-Beauty.ttf') format('truetype');
}

.element-with-custom-font {
  font-family: 'Nature Beauty';
}
```

## Tasks

Developers should run these often!

- `grunt nag` or just `grunt`: runs code quality analysis tools on your code
    and complains
- `grunt make-standard`: reformats all your code in the JavaScript Standard Style
- `grunt <server|serve|s>`: generates bundles, watches, and livereloads
- `grunt build`: place bundled styles and scripts where `index.html` can find
    them
- `grunt deploy`: builds and deploys main branch


## Additional Resources

- [Modern Javascript Explained for Dinosaurs](https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70)
- [Making Sense of Front End Build Tools](https://medium.freecodecamp.org/making-sense-of-front-end-build-tools-3a1b3a87043b)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
