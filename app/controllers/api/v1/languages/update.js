'use strict'

const { Language } = require('models')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('name', 'Invalid postparam').notEmpty()

    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    req.sanitizeBody('name').trim()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const slug = req.params.slug
    const { name } = req.body
    const language = yield Language.filter({slug}).getJoin({ author: true }).run().then((items) => (items.length && items.pop()))
    if (!language) return res.status(404).json({message: 'Language not found'})
    if (language.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield language.merge({ name }).save()

    res.json(data)
  }

}
