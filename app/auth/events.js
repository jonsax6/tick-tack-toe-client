'use strict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = (event) => {
  event.preventDefault()
  console.log('...in signup...')

  // get information from event and form
  const form = event.target
  const data = getFormFields(form)

  // to be used later for auto sign-in
  // const email = data.credentials.email
  // const password = data.credentials.password
  // const signInData = {
  //   credentials: {
  //     email: `${email}`,
  //     password: `${password}`
  //   }
  // }
  // console.log(signInData)
  
  // make an API call using ajax
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  console.log('...in sign-in...')
  const form = event.target
  const data = getFormFields(form)
  console.log(data)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  console.log('...in sign-out...')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut
}
