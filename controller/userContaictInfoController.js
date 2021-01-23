const ContactInfo = require('../models/ContactInfo')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

module.exports = {
  setContaictInfo: async (req, res) => {
    const { contactInfo } = req.body
    const { _id } = contactInfo

    const isId = await ContactInfo.findOne({ _id })

    if (isId) {
      const ConInfo = await ContactInfo.findOneAndUpdate({ _id }, contactInfo, {
        new: true,
      })
      res.status(200).json({ contactInfo: ConInfo })
    } else {
      const user = await User.findOne({ _id: req.user.id })

      const ConInfo = new ContactInfo({
        ...contactInfo,
        username: user.username,
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
  uploadUserPhoto: async (req, res) => {
    const { imgUrl } = req.body
    try {
      let { secure_url, public_id } = await cloudinary.v2.uploader.upload(
        imgUrl,
        {
          format: 'jpeg',
          width: 400,
        },
      )
      const userPhoto = { imgUrl: secure_url, id: public_id }
      res.status(200).json({ userPhoto })
    } catch (err) {
      res.status(400).json(err)
    }
  },
}
