'use strict'

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    let user = req.user
    res.json(user)
  }

}
