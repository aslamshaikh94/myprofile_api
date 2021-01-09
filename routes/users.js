const express = require('express')
let app = express()

const verifyToken = require('../middleware/verifyToken')

const {
  userSignUp,
  userSignIn,
  isUserNameExists,
  userCount,
} = require('../controller/userController')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// User signup route
app.post('/signup', userSignUp)

// User authentication route
app.post('/signin', userSignIn)

// User cout route
app.get('/usercout', userCount)

// Check is username exists route
app.get('/:id', isUserNameExists)

module.exports = app
