'use strict'

const { Language } = require('models')
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
    const data = yield Language.getJoin({ author: true }).orderBy(r.desc('createdAt')).limit(limit).run()
    res.json(data)
  }

}
