const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EducationSchema = Schema(
  {
    institute: {
      type: String,
      required: 'Institute is required',
    },
    education: {
      type: String,
      required: 'Education is required',
    },
    passOut: {
      type: String,
      required: 'Passing out year is required',
    },
    totalMarks: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'user is required',
    },
  },
  { timestamps: true },
)

module.exports = UserEducation = mongoose.model(
  'UserEducation',
  EducationSchema,
)
