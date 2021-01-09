const mongoose = require('mongoose')

const Schema = mongoose.Schema

const languagesSchema = new Schema(
  {
    languages: { type: Array },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'user is required',
    },
  },
  { timestamps: true },
)

module.exports = UserLanguages = mongoose.model(
  'UserLanguages',
  languagesSchema,
)
