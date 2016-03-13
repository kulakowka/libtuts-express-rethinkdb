'use strict'

const User = require('models/user')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const user = yield User.getBy({id})
    if (!user) return res.status(404).json({message: 'User not found'})
    res.json(user)
  }

}
