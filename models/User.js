const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'Email is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    contacntinfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactInfo',
    },
  },
  { timestamps: true },
)

module.exports = User = mongoose.model('User', userSchema)
