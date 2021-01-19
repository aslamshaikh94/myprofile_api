const ContactInfo = require('../models/ContactInfo')

const isPersonalInfo = (contactInfo) => {
  if (!contactInfo.personalInfo) {
    Object.assign(contactInfo, {
      address: 'xxxxxxxxxx',
      email: 'xxxxxx@xyz.com',
      mobile: '0000000000',
      gitlink: '',
      linkedin: '',
      userPhoto: {},
    })
  }
  return contactInfo
}

module.exports = {
  getUsersContactList: async (req, res) => {
    const usersList = await ContactInfo.find(
      {},
      {
        userPhoto: 1,
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
    try {
      const { _id } = await User.findOne({ username: req.params.id })

      const cInfo = (await ContactInfo.findOne({ user: _id })) || {}
      const skills = (await UserSkills.findOne({ user: _id })) || []
      const languages = (await UserLanguages.findOne({ user: _id })) || []
      const employments = (await UserEmployment.find({ user: _id })) || []
      const educations = (await UserEducation.find({ user: _id })) || []
      const projects = (await UserProject.find({ user: _id })) || []

      const contactInfo = await isPersonalInfo(cInfo)

      res.status(200).json({
        contactInfo,
        skills,
        languages,
        employments,
        educations,
        projects,
      })
    } catch (err) {
      res.status(404).json({ message: 'User not found' })
    }
  },
}
