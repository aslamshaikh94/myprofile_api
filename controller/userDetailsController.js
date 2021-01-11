const ContactInfo = require('../models/ContactInfo')

module.exports = {
  getUsersContactList: async (req, res) => {
    const usersList = await ContactInfo.find(
      {},
      {
        username: 1,
        name: 1,
        user: 1,
        designation: 1,
        address: 1,
      },
    )

    res.status(200).json(usersList)
  },
  getUserDetails: async (req, res) => {
    const { _id } = await User.findOne({ username: req.params.id })

    const contactInfo = (await ContactInfo.findOne({ user: _id })) || {}
    const skills = (await UserSkills.findOne({ user: _id })) || []
    const languages = (await UserLanguages.findOne({ user: _id })) || []
    const employments = (await UserEmployment.find({ user: _id })) || []
    const educations = (await UserEducation.find({ user: _id })) || []
    const projects = (await UserProject.find({ user: _id })) || []

    res.status(200).json({
      contactInfo,
      skills,
      languages,
      employments,
      educations,
      projects,
    })
  },
}
