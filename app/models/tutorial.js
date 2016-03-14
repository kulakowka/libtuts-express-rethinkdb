
'use strict'

var marked = require('marked')
var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
var Comment = require('./comment')
var User = require('./user')
var Project = require('./project')
var Language = require('./language')

var Tutorial = thinky.createModel('Tutorial', {
  id: type.string(),
  title: type.string(),
  content: type.string(),
  contentHtml: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

// Tutorial.hasAndBelongsToMany(Project, 'projects', 'id', 'id')
// Tutorial.hasAndBelongsToMany(Language, 'languages', 'id', 'id')
// Tutorial.hasMany(Comment, 'comments', 'id', 'tutorialId')
Tutorial.belongsTo(User, 'author', 'authorId', 'id')

// marked content
Tutorial.pre('save', function (next) {
  if (this.content) this.contentHtml = marked(this.content)
  next()
})

module.exports = Tutorial
