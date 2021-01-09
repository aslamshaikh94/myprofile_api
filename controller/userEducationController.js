const UserEducation = require('../models/Education')

module.exports = {
  setUserEducation: async (req, res) => {
    const { education } = req.body
    const { _id } = education

    const isId = await UserEducation.findOne({ _id })
    if (isId) {
      const eduSave = await UserEducation.findOneAndUpdate({ _id }, education, {
        new: true,
      })

      res.status(200).json(eduSave)
    } else {
      const eduReq = await UserEducation({ ...education, user: req.user.id })
      const educations = await eduReq.save()
      res.status(200).json(educations)
    }
  },
  deleteUserEducation: async (req, res) => {
    const { id } = req.params

    const { _id } = await UserEducation.findOneAndDelete({ _id: id })

    res.status(200).json({ _id })
  },
}
