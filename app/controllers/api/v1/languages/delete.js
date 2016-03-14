'use strict'

const Language = require('models/language')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    // if is owner
    // req.checkParams('authorId', 'Id is invalid').equals(req.user.id)

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const slug = req.params.slug
    const language = yield Language.filter({slug}).getJoin({ author: true }).run().then((items) => (items.length && items.pop()))
    if (!language) return res.status(404).json({ message: 'Language not found' })
    if (language.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield language.delete()
    res.json(data)
  }

}
