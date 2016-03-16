'use strict'

const { Comment, Tutorial, User } = require('models')

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
    const author = yield User.get(req.user.id).run()
    if (!author) return res.status(404).json({message: 'User not found'})
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
