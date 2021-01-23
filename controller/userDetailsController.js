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

const isPrivateInfo = async (list = []) => {
  return list.map((item) => {
    return item.personalInfo
      ? item
      : Object.assign(item, { ...item, userPhoto: '', address: 'xxxxxxxxxx' })
  })
}

module.exports = {
  getUsersContactList: async (req, res) => {
    const list = await ContactInfo.find(
      {},
      {
        personalInfo: 1,
        userPhoto: 1,
        username: 1,
        name: 1,
        user: 1,
        designation: 1,
        address: 1,
      },
    )
    const usersList = await isPrivateInfo(list)

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
  getLoginUserDetails: async (req, res) => {
    try {
      const _id = req.user.id

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
    } catch (err) {
      res.status(404).json({ message: 'User not found' })
    }
  },
}
