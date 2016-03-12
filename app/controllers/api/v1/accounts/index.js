'use strict'

const Account = require('models/account')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    const data = yield Account.without('password').limit(10).execute()

    res.json(data)
  }

}
