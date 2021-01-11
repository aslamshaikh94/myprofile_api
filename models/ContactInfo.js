const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContacntInfoSchema = Schema(
  {
    name: {
      type: String,
      required: 'Name is required',
    },
    username: {
      type: String,
    },
    designation: {
      type: String,
      required: 'Designation',
    },
    mobile: {
      type: String,
      required: 'Mobile number is required',
      unique: true,
    },
    email: {
      type: String,
      required: 'Email is required',
    },
    address: {
      type: String,
      required: 'Address is required',
    },
    gitlink: {
      type: String,
    },
    linkedin: {
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

module.exports = ContactInfo = mongoose.model('ContactInfo', ContacntInfoSchema)
