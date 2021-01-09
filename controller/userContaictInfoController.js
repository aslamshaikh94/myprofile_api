const { findOne } = require('../models/ContactInfo')
const ContactInfo = require('../models/ContactInfo')

module.exports = {
  setContaictInfo: async (req, res) => {
    const {
      _id,
      name,
      designation,
      email,
      mobile,
      address,
      gitlink,
      linkedin,
    } = req.body

    const isId = await ContactInfo.findOne({ _id })

    if (isId) {
      const ConInfo = await ContactInfo.findOneAndUpdate(
        { _id },
        { name, designation, email, mobile, address, gitlink, linkedin },
        {
          new: true,
        },
      )
      res.status(200).json({ contactInfo: ConInfo })
    } else {
      const user = await User.findOne({ _id: req.user.id })

      const ConInfo = new ContactInfo({
        name,
        designation,
        email,
        mobile,
        address,
        gitlink,
        linkedin,
        user: user._id,
      })

      const ConInfoSaved = await ConInfo.save()
      res.status(200).json(ConInfoSaved)
    }
  },
  getUserContactInfo: async (req, res) => {
    try {
      const contactInfo = await ContactInfo.findOne({ user: req.user.id })

      if (contactInfo) {
        res.status(200).json(contactInfo)
      } else {
        res.status(200).json({})
      }
    } catch {
      res.status(400).json({ message: 'Something went wrong' })
    }
  },
}
