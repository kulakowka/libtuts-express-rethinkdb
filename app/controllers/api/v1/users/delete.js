'use strict'

const User = require('models/user')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    // if is owner
    req.checkParams('username', 'Username is invalid').equals(req.user.username)

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const username = req.params.username

    const users = yield User.filter({ username })
                            .pluck(
                              'id',
                              'username',
                              'fullName',
                              'createdAt',
                              'updatedAt',
                              'role'
                            ).run()

    const user = users.pop()

    if (!user) return res.status(404).json({ message: 'User not found' })

    const data = yield user.delete()

    res.json(data)
  }

}
