'use strict'

const { Tutorial } = require('models')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('title', 'Invalid postparam').notEmpty()

    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    req.sanitizeBody('title').trim()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const { title, content } = req.body
    const tutorial = yield Tutorial.filter({id}).getJoin({ author: true, languages: true }).run().then((items) => (items.length && items.pop()))
    if (!tutorial) return res.status(404).json({message: 'Tutorial not found'})
    if (tutorial.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield tutorial.merge({ title, content }).save()

    res.json(data)
  }

}
