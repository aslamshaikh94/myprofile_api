const UserEmployment = require('../models/Employment')
const userEducationController = require('./userEducationController')

module.exports = {
  setUserEmployment: async (req, res) => {
    const { employment } = req.body
    const { _id } = employment
    const isId = await UserEmployment.findOne({ _id })

    if (isId) {
      const employments = await UserEmployment.findOneAndUpdate(
        { _id },
        employment,
        { new: true },
      )

      res.status(200).json(employments)
    } else {
      const empSaved = await UserEmployment({
        ...employment,
        user: req.user.id,
      })

      const employments = await empSaved.save()

      res.status(200).json(employments)
    }
  },
  deleteUserEmployment: async (req, res) => {
    const { id } = req.params

    const { _id } = await UserEmployment.findOneAndDelete({ _id: id })

    res.status(200).json({ _id })
  },
}
