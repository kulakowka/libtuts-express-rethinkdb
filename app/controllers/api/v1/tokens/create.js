'use strict'

// const User = require('models/account')
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
      if (!user) return res.status(400).json({ message: 'Incorrect username or password' })

      var token = jwt.sign(user, TOKEN_SECRET, {
        expiresIn: '24h'
      })

      res.json({ token })
    })(req, res, next)
  }

}
