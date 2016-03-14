'use strict'

const Tutorial = require('models/tutorial')
const Language = require('models/language')
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
    const slug = req.params.slug

    const limit = req.query.limit && 
                  (req.query.limit < ITEMS_PER_PAGE) ? 
                  req.query.limit : 
                  ITEMS_PER_PAGE

    const language = yield Language.filter({slug})
                                   .pluck('id')
                                   .run()
                                   .then((items) => (items.length && items.pop()))

    if (!language) return res.status(404)
                             .json({message: 'Language not found'})

    const data = yield Tutorial.filter(r.row('languages').contains(language.id))
                               .orderBy(r.desc('createdAt'))
                               .limit(limit)
                               .run()
    res.json(data)
  }

}
