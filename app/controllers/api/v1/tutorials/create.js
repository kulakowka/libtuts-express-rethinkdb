'use strict'

const Tutorial = require('models/tutorial')

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
    const { title, content } = req.body
    const author = req.user
    const tutorial = new Tutorial({ title, content, author })
    const data = yield tutorial.saveAll({author: true}).catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      delete data.content

      res.json(data)
    }
  }

}
