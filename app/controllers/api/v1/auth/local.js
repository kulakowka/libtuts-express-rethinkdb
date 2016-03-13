'use strict'

const Account = require('models/account')
var passport = require('passport')

var jwt = require('jsonwebtoken')

const TOKEN_SECRET = 'token secret string'

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
    passport.authenticate('local', function (err, user, info) {
      if (err) return next(err)
      if (!user) return res.json(401, { error: 'User not found' })
      var token = jwt.sign({ id: user.id }, TOKEN_SECRET)
      res.json({ token })
    })(req, res, next)
  }

}
