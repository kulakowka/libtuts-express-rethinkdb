'use strict'

const User = require('models/user')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('email', 'Email is invalid').notEmpty().isEmail()
    req.checkBody('password', 'Password is invalid').notEmpty()
    req.checkBody('username', 'Invalid postparam').notEmpty()
    // if is owner
    req.checkParams('id', 'Id is invalid').equals(req.user.id)
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
    const username = req.params.username

    const user = yield User.getBy({ username })

    if (!user) return res.status(404).json({message: 'User not found'})

    const data = yield user.merge({ email, password }).save()

    res.json(data)
  }

}
