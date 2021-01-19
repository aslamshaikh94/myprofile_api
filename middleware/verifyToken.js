const jwt = require('jsonwebtoken')
let SECRETKEY = process.env.SECRET_KEY

module.exports = (req, res, next) => {
  const headerToken = req.header('Authorization')
  const token = headerToken && headerToken.split(' ')[1]

  // Check for token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorizaton denied' })
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, SECRETKEY)
    // Add user from payload
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Please Login First' })
  }
}
