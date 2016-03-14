
'use strict'

var slug = require('slug')
var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
var Tutorial = require('./tutorial')
var Project = require('./project')
var User = require('./user')

var Language = thinky.createModel('Language', {
  id: type.string(),
  name: type.string(),
  slug: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Language.ensureIndex('slug')

// Language.hasAndBelongsToMany(Tutorial, 'tutorials', 'id', 'id')
// Language.hasAndBelongsToMany(Project, 'projects', 'id', 'id')
Language.belongsTo(User, 'author', 'authorId', 'id')

// marked content
Language.pre('save', function (next) {
  let name = this.name.replace(/\+/g, 'p').replace(/\#/g, 'sharp')
  this.slug = slug(name).toLowerCase()
  next()
})

module.exports = Language
