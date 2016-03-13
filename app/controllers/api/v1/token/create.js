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
      if (!user) return res.status(401).json({ error: 'User not found' })

      var token = jwt.sign({
        id: user.id,
        createdAt: new Date()
      }, TOKEN_SECRET)

      console.log(user, token)

      res.json({ token })
    })(req, res, next)
  }

}
