const UserProject = require('../models/Projects')

module.exports = {
  setUserProject: async (req, res) => {
    const { project } = req.body
    const { _id } = project
    const isId = await UserProject.findOne({ _id })
    if (isId) {
      const projects = await UserProject.findOneAndUpdate({ _id }, project, {
        new: true,
      })

      res.status(200).json(projects)
    } else {
      const proReq = await UserProject({
        ...project,
        user: req.user.id,
      })
      const projects = await proReq.save()
      res.status(200).json(projects)
    }
  },
}
