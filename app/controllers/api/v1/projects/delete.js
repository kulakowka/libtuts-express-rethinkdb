'use strict'

const { Project } = require('models')

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
    const project = yield Project.filter({slug}).getJoin({ author: true }).run().then((items) => (items.length && items.pop()))
    if (!project) return res.status(404).json({ message: 'Project not found' })
    if (project.authorId !== req.user.id) return res.status(403).json({ message: 'Permission denied' })
    const data = yield project.delete()
    res.json(data)
  }

}
