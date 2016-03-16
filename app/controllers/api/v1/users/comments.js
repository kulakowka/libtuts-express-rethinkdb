'use strict'

const { User, Comment } = require('models')

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

    const data = yield Comment.getJoin({ author: true, tutorial: true })
                               .filter({ authorId: user.id })
                               .pluck(
                                  'id',
                                  'contentHtml',
                                  'createdAt',
                                  'updatedAt',
                                  { author: ['id', 'username', 'fullName'] },
                                  { tutorial: ['id', 'title'] }
                                )
                               .orderBy(r.desc('createdAt'))
                               .limit(limit)
                               .execute()
    res.json(data)
  }

}
