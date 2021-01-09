const mongoose = require('mongoose')

const Schema = mongoose.Schema

const skillsSchema = new Schema(
  {
    skills: { type: Array },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'user is required',
    },
  },
  { timestamps: true },
)

module.exports = UserSkills = mongoose.model('UserSkills', skillsSchema)
