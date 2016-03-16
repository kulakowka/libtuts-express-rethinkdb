'use strict'

const { User, Tutorial } = require('models')
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

    const username = req.params.username

    const users = yield User.filter({ username }).run()
    const user = users.pop()

    if (!user) return res.status(404).json({message: 'User not found'})

    const data = yield Tutorial.getJoin({ author: true, languages: true })
                               .filter({ authorId: user.id })
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
