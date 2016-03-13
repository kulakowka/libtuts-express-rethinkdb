'use strict'

const Account = require('models/account')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const data = yield Account.get(id).without('password', 'token').execute()

    res.json(data)
  }

}
