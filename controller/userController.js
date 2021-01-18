const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRETKEY = process.env.SECRET_KEY

module.exports = {
  userSignUp: async (req, res) => {
    const { username, email, password } = req.body
    const saltRounds = 10

    const creatNewUser = async (hash) => {
      try {
        user = new User({
          username,
          email,
          password: hash,
        })
        let newuser = await user.save()
        if (newuser) {
          let { _id, username } = newuser
          jwt.sign(
            { id: _id },
            SECRETKEY,
            /*{ expiresIn: 3600 },*/ (err, token) => {
              if (token) {
                res.status(200).json({
                  id: _id,
                  username,
                  token,
                })
              }
            },
          )
        }
      } catch (error) {
        res.status(400).json({ message: error })
      }
    }

    try {
      let user = await User.find({ email, username })

      if (!user.length) {
        try {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
              creatNewUser(hash)
            })
          })
        } catch (err) {
          res.status(400).json({ message: err })
        }
      } else {
        res.status(400).json({ message: 'User already exists' })
      }
    } catch (error) {
      res.status(400).json({ message: error })
    }
  },
  userSignIn: async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email: email })
      if (user) {
        let { _id, username } = user
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          jwt.sign(
            { id: _id },
            SECRETKEY,
            /*{ expiresIn: 3600 },*/ (err, token) => {
              if (token) {
                res.status(200).json({
                  id: _id,
                  username,
                  token,
                })
              }
            },
          )
        } else {
          res.status(400).json({ message: 'Password is not valid' })
        }
      } else {
        res.status(400).json({ message: 'User not found' })
      }
    } catch (error) {
      res.status(400).json({ message: error })
    }
  },
  isUserNameExists: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id })
      if (user) {
        res.status(200).json({ isUsername: true })
      } else {
        res.status(200).json({ isUsername: false })
      }
    } catch {
      res.status(400).json({ message: 'Not Found' })
    }
  },
  userCount: async (req, res) => {
    const totalUser = await User.find({}).countDocuments()
    res.status(200).json(totalUser)
  },
}
