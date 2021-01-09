const UserLanguages = require('../models/Languages')

module.exports = {
  setUserLanguages: async (req, res) => {
    const { _id, languages: reqLangs } = req.body
    if (_id) {
      const languages = await UserLanguages.findOneAndUpdate(
        { _id },
        { languages: reqLangs },
        { new: true },
      )

      res.status(200).json({ languages })
    } else {
      const languages = UserLanguages({
        languages: reqLangs,
        user: req.user.id,
      })
      const langSaved = await languages.save()
      res.status(200).json({ languages: langSaved })
    }
  },
}
