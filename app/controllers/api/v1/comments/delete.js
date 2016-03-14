'use strict'

const Comment = require('models/comment')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    // if is owner
    // req.checkParams('authorId', 'Id is invalid').equals(req.user.id)

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const comment = yield Comment.filter({id}).getJoin({ author: true, tutorial: true }).without('content').run().then((items) => (items.length && items.pop()))
    if (!comment) return res.status(404).json({ message: 'Comment not found' })
    if (comment.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield comment.delete()
    res.json(data)
  }

}
