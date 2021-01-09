const UserSkills = require('../models/Skills')

module.exports = {
  setUserSkills: async (req, res) => {
    const { _id, skills: reqSkills } = req.body

    if (_id) {
      const skills = await UserSkills.findOneAndUpdate(
        { _id },
        { skills: reqSkills },
        { new: true },
      )

      res.status(200).json({ skills })
    } else if (req.user.id) {
      const skills = new UserSkills({
        skills: reqSkills,
        user: req.user.id,
      })

      const skillsSaved = await skills.save()

      res.status(200).json({ skills: skillsSaved })
    }
  },
  getUserSkills: async (req, res) => {
    const skills = await UserSkills.findOne({ user: req.user.id })
    res.status(200).json({ skills })
  },
}
