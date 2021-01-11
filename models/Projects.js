const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjectsSchema = Schema(
  {
    projectname: {
      type: String,
    },
    projectLink: {
      type: String,
    },
    technologies: {
      type: String,
    },
    describe: {
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

module.exports = UserProject = mongoose.model('UserProject', ProjectsSchema)
