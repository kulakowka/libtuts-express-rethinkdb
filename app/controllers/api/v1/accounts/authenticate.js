'use strict'

const Account = require('models/account')
var api = require('express-api-helper')
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
    const { email, password } = req.body

    const account = yield Account.find({ email }).limit(1).run()
    if (!account.length) api.notFound(req, res)

    account.pop().checkPassword(password, (err, result) => {
      if (err) return next(err)
      if (!result) api.badRequest(req, res, [{ message: 'Incorrect password.' }])

      // if user is found and password is right
      

      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    })

    
  }

}
