'use strict'

const { User } = require('models')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('email', 'Email is invalid').notEmpty().isEmail()
    req.checkBody('password', 'Password is invalid').notEmpty()

    // if is owner
    req.checkParams('username', 'Username is invalid').equals(req.user.username)
    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    req.sanitizeBody('email').normalizeEmail().trim()
    req.sanitizeBody('fullName').trim()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const { email, password, fullName } = req.body
    const username = req.params.username

    const users = yield User.filter({ username })
                            .pluck(
                              'id',
                              'username',
                              'password',
                              'fullName',
                              'createdAt',
                              'updatedAt',
                              'role'
                            ).run()
    const user = users.pop()

    if (!user) return res.status(404).json({message: 'User not found'})

    const data = yield user.merge({ fullName, email, password }).save()

    delete data.password

    res.json(data)
  }

}
