const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmploymentSchema = Schema(
  {
    organization: {
      type: String,
      required: 'Name is required',
    },
    designation: {
      type: String,
      required: 'Designation is required',
    },
    workedFrom: {
      type: String,
      required: 'Date from is required',
    },
    workedTill: {
      type: String,
      required: 'Date till is required',
    },
    describe: {
      type: String,
      required: 'Describe is required',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'user is required',
    },
  },
  { timestamps: true },
)

module.exports = UserEmployment = mongoose.model(
  'UserEmployment',
  EmploymentSchema,
)
