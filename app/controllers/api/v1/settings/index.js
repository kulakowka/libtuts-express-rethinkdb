'use strict'

const Account = require('models/account')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    res.json({
      ok: true,
      user: req.user
    })
  }

}
