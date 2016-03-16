'use strict'

const { Project } = require('models')
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
    const data = yield Project.getJoin({ author: true, languages: true })
                               .pluck(
                                  'id',
                                  'name',
                                  'slug',
                                  'tutorialsCount',
                                  'createdAt',
                                  'updatedAt',
                                  { author: ['id', 'username', 'fullName'] },
                                  { languages: ['id', 'name', 'slug'] }
                                )
                               .orderBy(r.desc('createdAt'))
                               .limit(limit)
                               .execute()
    res.json(data)
  }

}
