'use strict'

const { Tutorial } = require('models')
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

    const data = yield Tutorial.getJoin({ author: true, languages: true })
                               .pluck(
                                  'id',
                                  'title',
                                  // 'contentHtml',
                                  'commentsCount',
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
