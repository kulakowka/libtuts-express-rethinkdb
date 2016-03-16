'use strict'

const { Tutorial } = require('models')

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
    const tutorial = yield Tutorial.filter({id}).getJoin({ author: true, languages: true }).run().then((items) => (items.length && items.pop()))
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' })
    if (tutorial.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield tutorial.delete()
    res.json(data)
  }

}
