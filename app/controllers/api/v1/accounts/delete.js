'use strict'

const Account = require('models/account')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const account = yield Account.get(id)
    const data = yield account.delete()
    delete data.password
    res.json(data)
  }

}
