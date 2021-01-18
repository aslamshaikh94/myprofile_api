const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  next()
})

const MONGO_DB = process.env.MONGO_DB

mongoose.connect(
  MONGO_DB,
  {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (('Error', err)) {
      console.log(err)
    } else {
      console.log('connected')
    }
  },
)

// default route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// user route
const users = require('./routes/users')
app.use('/users', users)

// userinfo route
const usersinfo = require('./routes/usersDetails')
app.use('/userdetails', usersinfo)

// Server setup
const PORT = process.env.APP_PORT || 8850
app.listen(PORT, () => {
  console.log('Server is running ' + PORT)
})
