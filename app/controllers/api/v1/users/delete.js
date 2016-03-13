'use strict'

const User = require('models/user')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    // if is owner
    req.checkParams('id', 'Id is invalid').equals(req.user.id)

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const user = yield User.get(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    const data = yield user.delete()
    delete data.password
    res.json(data)
  }

}
