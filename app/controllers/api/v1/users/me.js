'use strict'

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    res.json({
      user: req.user,
      authInfo: req.authInfo
    })
  }

}
