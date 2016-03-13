'use strict'

const User = require('models/user')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('email', 'Invalid postparam').notEmpty().isEmail()
    req.checkBody('password', 'Invalid postparam').notEmpty()

    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    req.sanitizeBody('email').normalizeEmail()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const { email, password } = req.body

    const user = new User({email, password})
    const data = yield user.save().catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      delete data.password

      res.json(data)
    }
  }

}
