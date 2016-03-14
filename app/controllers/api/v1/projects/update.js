'use strict'

const Project = require('models/project')

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
    const project = yield Project.filter({slug}).getJoin({ author: true }).run().then((items) => (items.length && items.pop()))
    if (!project) return res.status(404).json({message: 'Project not found'})
    if (project.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield project.merge({ name }).save()

    res.json(data)
  }

}
