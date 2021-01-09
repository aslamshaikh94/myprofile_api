const express = require('express')
const verifyToken = require('../middleware/verifyToken')

const { getUserDetails } = require('../controller/userDetailsController')
const {
  setContaictInfo,
  getUserContactInfo,
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

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/:id', getUserDetails)

app.post('/contactinfo', verifyToken, setContaictInfo)

app.post('/skills', verifyToken, setUserSkills)

app.post('/languages', verifyToken, setUserLanguages)

app.post('/employment', verifyToken, setUserEmployment)
app.delete('/employment/:id', verifyToken, deleteUserEmployment)

app.post('/education', verifyToken, setUserEducation)
app.delete('/education/:id', verifyToken, deleteUserEducation)

app.get('/:id', getUserContactInfo)

module.exports = app
