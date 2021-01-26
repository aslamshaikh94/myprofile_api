const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { findOneAndUpdate } = require('../models/User')

const SECRETKEY = process.env.SECRET_KEY
const saltRounds = 10

module.exports = {
  userSignUp: async (req, res) => {
    const { username, email, password } = req.body

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
          const token = jwt.sign({ id: _id }, SECRETKEY)
          if (token) {
            res.status(200).json({
              id: _id,
              username,
              token,
            })
          }
        }
      } catch (error) {
        res.status(400).json({ message: error })
      }
    }

    try {
      let user = await User.findOne({ email })
      let userName = await User.findOne({ username })

      if (!user && !userName) {
        try {
          const hash = bcrypt.hashSync(password, saltRounds)
          if (hash) creatNewUser(hash)
        } catch (err) {
          res.status(400).json({ message: 'Something went wrong' })
        }
      } else {
        res.status(400).json({ message: 'User already exists' })
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Something went wrong' })
    }
  },

  // User Sign in
  userSignIn: async (req, res) => {
    const { email, password } = req.body

    let user = await User.findOne({ email: email })
    if (user) {
      let { _id, username } = user
      const match = bcrypt.compareSync(password, user.password)
      if (match) {
        const token = jwt.sign({ id: _id }, SECRETKEY)
        if (token) {
          res.status(200).json({
            id: _id,
            username,
            token,
          })
        }
      } else {
        res.status(400).json({ message: 'Password is not valid' })
      }
    } else {
      res.status(400).json({ message: 'User not found' })
    }
  },

  // Check User name is exists
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

  // Get Total Users Count
  userCount: async (req, res) => {
    const totalUser = await User.find({}).countDocuments()
    res.status(200).json(totalUser)
  },

  // Send Reset Password Link
  sendForgotPassword: async (req, res) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
    const token = crypto.randomBytes(32).toString('hex')

    const { email } = req.body
    const { _id } = (await User.findOne({ email })) || {}

    await User.findOneAndUpdate({ _id }, { token }, { new: true })

    if (!_id) {
      res.status(400).json({ message: 'Please enter valid email and username' })
    }

    let transporter = nodemailer.createTransport({
      host: 'stackoverpro.com',
      secure: false,
      auth: {
        user: 'support@stackoverpro.com',
        pass: '0S@bDd1msDzhju1n',
      },
    })

    let mailOptions = {
      from: 'support@stackoverpro.com',
      to: email,
      subject: 'Reset password',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' +
        req.headers.referer +
        'resetpassword/' +
        token +
        '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    }

    transporter.sendMail(mailOptions, (error, success) => {
      if (error) {
        res.status(400).json({ message: 'Somthing went wrong' })
      } else {
        res.status(200).json({
          message: `An email has been sent to ${email} please check your inbox`,
        })
      }
    })
  },
  resetPassword: async (req, res) => {
    const { email, password, token } = req.body
    const { _id, token: userToken } = (await User.findOne({ email })) || {}
    const hash = bcrypt.hashSync(password, saltRounds)

    if (userToken === token) {
      await User.findOneAndUpdate(
        { _id },
        { password: hash, token: '' },
        { new: true },
      )
      res.status(200).json({ message: 'Password successfully changed' })
    } else {
      res.status(400).json({ message: 'Invalid request' })
    }
  },
}
