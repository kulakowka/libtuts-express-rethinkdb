'use strict'

const { User } = require('models')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    let username = req.user.username

    const users = yield User.filter({ username })
                            .without('password')
                            .execute()
    const user = users.pop()

    if (!user) return res.status(404).json({message: 'User not found'})

    res.json(user)
  }

}
