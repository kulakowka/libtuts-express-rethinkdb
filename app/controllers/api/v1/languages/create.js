'use strict'

const Language = require('models/language')

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
    const language = new Language({ name, author })
    const data = yield language.saveAll({author: true}).catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      res.json(data)
    }
  }

}
