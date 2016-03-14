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
    const id = req.params.id
    const { email, password, username } = req.body
    const user = yield User.getBy({id})
    if (!user) return res.status(404).json({message: 'User not found'})
    const data = yield user.merge({email, password, username}).save()

    res.json(data)
  }

}
