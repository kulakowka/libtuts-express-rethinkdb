'use strict'

const Comment = require('models/comment')
const Tutorial = require('models/tutorial')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('tutorialId', 'Invalid postparam').notEmpty()
    req.checkBody('content', 'Invalid postparam').notEmpty()

    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    // req.sanitizeBody('email').normalizeEmail()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    const { tutorialId, content } = req.body
    const author = req.user
    const tutorial = yield Tutorial.get(tutorialId).run()
    const comment = new Comment({ tutorial, content, author })
    const data = yield comment.saveAll({author: true, tutorial: true}).catch((err) => {
      res.status(400).json({message: err.message})
    })

    if (data) {
      delete data.content

      res.json(data)
    }
  }

}
