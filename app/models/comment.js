'use strict'

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

module.exports = Comment
