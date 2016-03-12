'use strict'

const Account = require('models/account')

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
    const id = req.params.id
    const { email, password } = req.body
    const data = yield Account.get(id).update({email, password}).run()

    res.json(data)
  }

}
