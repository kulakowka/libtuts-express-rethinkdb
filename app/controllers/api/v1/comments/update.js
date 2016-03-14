'use strict'

const Comment = require('models/comment')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('content', 'Invalid postparam').notEmpty()

    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    // req.sanitizeBody('email').normalizeEmail()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const { content } = req.body
    const comment = yield Comment.filter({id}).getJoin({ author: true, tutorial: true }).without('content').run().then((items) => (items.length && items.pop()))
    if (!comment) return res.status(404).json({message: 'Comment not found'})
    if (comment.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield comment.merge({ content }).save()

    res.json(data)
  }

}
