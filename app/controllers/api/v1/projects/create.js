'use strict'

const { Project } = require('models')

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
    const { name } = req.body
    const author = req.user
    const project = new Project({ name, author })
    const data = yield project.saveAll({author: true}).catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      res.json(data)
    }
  }

}
