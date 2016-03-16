'use strict'

const { Language, Tutorial } = require('models')

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
    let { title, content, languages } = req.body
    const author = req.user
    if (languages) {
      languages = typeof languages === 'string' ? [languages] : languages
      languages = yield Language.getAll(...languages).run()
    }
    const tutorial = new Tutorial({ title, content, author, languages })
    const data = yield tutorial.saveAll({author: true, languages: true}).catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      delete data.content

      res.json(data)
    }
  }

}
