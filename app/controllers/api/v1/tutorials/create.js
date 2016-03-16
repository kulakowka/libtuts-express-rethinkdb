'use strict'

const { Language, Tutorial, User, Project } = require('models')

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
    let { title, content, languages, projects } = req.body
    const author = yield User.get(req.user.id).run()
    if (!author) return res.status(404).json({message: 'User not found'})
    if (languages) {
      languages = typeof languages === 'string' ? [languages] : languages
      languages = yield Language.getAll(...languages).run()
    }
    if (projects) {
      projects = typeof projects === 'string' ? [projects] : projects
      projects = yield Project.getAll(...projects).run()
    }
    const tutorial = new Tutorial({ title, content, author, languages, projects })
    const data = yield tutorial.saveAll({author: true, languages: true, projects: true}).catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      delete data.content

      res.json(data)
    }
  }

}
