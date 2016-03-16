'use strict'

const { Comment } = require('models')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const data = yield Comment.filter({id}).getJoin({ author: true, tutorial: true }).without('content').run().then((items) => (items.length && items.pop()))
    if (!data) return res.status(404).json({message: 'Comment not found'})
    res.json(data)
  }

}
