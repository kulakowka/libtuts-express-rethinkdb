'use strict'

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    let user = req.user
    delete user.password
    res.json(user)
  }

}
