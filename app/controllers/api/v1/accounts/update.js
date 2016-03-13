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
    const account = yield Account.get(id)

    const data = yield account.merge({email, password}).save()

    res.json(data)
  }

}
