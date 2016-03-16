'use strict'

const { Language, User } = require('models')

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
    const author = yield User.get(req.user.id).run()
    if (!author) return res.status(404).json({message: 'User not found'})
    const language = new Language({ name, author })
    const data = yield language.saveAll({author: true}).catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      res.json(data)
    }
  }

}
