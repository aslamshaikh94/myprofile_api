const ContactInfo = require('../models/ContactInfo')
const UserSkills = require('../models/Skills')

module.exports = {
  getUserDetails: async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    const contactInfo = (await ContactInfo.findOne({ user: user._id })) || {}
    const skills = (await UserSkills.findOne({ user: user._id })) || []
    const languages = (await UserLanguages.findOne({ user: user._id })) || []
    const employments = (await UserEmployment.find({ user: user._id })) || []
    const educations = (await UserEducation.find({ user: user._id })) || []

    res
      .status(200)
      .json({ contactInfo, skills, languages, employments, educations })
  },
}
