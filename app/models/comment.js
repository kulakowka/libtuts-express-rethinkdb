'use strict'

var co = require('co')
var marked = require('marked')
var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
var Tutorial = require('./tutorial')
var User = require('./user')

var Comment = thinky.createModel('Comment', {
  id: type.string(),
  content: type.string(),
  contentHtml: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Comment.belongsTo(User, 'author', 'authorId', 'id')
Comment.belongsTo(Tutorial, 'tutorial', 'tutorialId', 'id')

// marked content
Comment.pre('save', function (next) {
  this.contentHtml = marked(this.content)
  next()
})

Comment.post('save', function (next) {
  const tutorialId = this.tutorialId
  const authorId = this.authorId
  co(function* () {
    // increment comments count
    yield Tutorial.get(tutorialId).update({commentsCount: r.row('commentsCount').add(1)}).run()
    yield User.get(authorId).update({commentsCount: r.row('commentsCount').add(1)}).run()
  })
  .then((value) => next())
  .catch(next)
})

Comment.post('delete', function (next) {
  const tutorialId = this.tutorialId
  const authorId = this.authorId
  co(function* () {
    // decrement comments count
    yield Tutorial.get(tutorialId).update({commentsCount: r.row('commentsCount').add(-1)}).run()
    yield User.get(authorId).update({commentsCount: r.row('commentsCount').add(-1)}).run()
  })
  .then((value) => next())
  .catch(next)
})

module.exports = Comment
