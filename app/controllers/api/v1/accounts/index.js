'use strict'

const Account = require('models/account')
const r = require('utils/thinky').r

const ITEMS_PER_PAGE = 30

module.exports = {

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    req.sanitizeQuery('limit').toInt()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const limit = req.query.limit && req.query.limit < ITEMS_PER_PAGE ? req.query.limit : ITEMS_PER_PAGE
    const data = yield Account.without('password').orderBy(r.desc('createdAt')).limit(limit).execute()
    // const data = yield Account.getBy({email: 'admin@mail.com'})
    res.json(data)
  }

}
