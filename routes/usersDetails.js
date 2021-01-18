const express = require('express')
const verifyToken = require('../middleware/verifyToken')

const {
  getUserDetails,
  getUsersContactList,
} = require('../controller/userDetailsController')

const {
  setContaictInfo,
  getUserContactInfo,
  uploadUserPhoto,
} = require('../controller/userContaictInfoController')

const { setUserSkills } = require('../controller/userSkillsController')
const { setUserLanguages } = require('../controller/UserLanguagesController')
const {
  setUserEmployment,
  deleteUserEmployment,
} = require('../controller/userEmploymentController')

const {
  setUserEducation,
  deleteUserEducation,
} = require('../controller/userEducationController')

const {
  setUserProject,
  deleteUserProject,
} = require('../controller/userProjectController')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/profile/:id', getUserDetails)

app.post('/contactinfo', verifyToken, setContaictInfo)

app.post('/skills', verifyToken, setUserSkills)

app.post('/languages', verifyToken, setUserLanguages)

app.post('/employment', verifyToken, setUserEmployment)
app.delete('/employment/:id', verifyToken, deleteUserEmployment)

app.post('/education', verifyToken, setUserEducation)
app.delete('/education/:id', verifyToken, deleteUserEducation)

app.post('/project', verifyToken, setUserProject)
app.delete('/project/:id', verifyToken, deleteUserProject)

app.post('/userslist', getUsersContactList)

app.post('/profilephoto', uploadUserPhoto)

app.get('/:id', getUserContactInfo)

module.exports = app
