'use strict'

const { User } = require('models')
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
    let limit = req.query.limit || ITEMS_PER_PAGE
    if (limit > ITEMS_PER_PAGE) limit = ITEMS_PER_PAGE

    const data = yield User.pluck(
                              'id',
                              'username',
                              'fullName',
                              'createdAt',
                              'updatedAt',
                              'tutorialsCount',
                              'commentsCount',
                              'role'
                            )
                            .orderBy(r.desc('createdAt'))
                            .limit(limit)
                            .execute()

    res.json(data)
  }

}
