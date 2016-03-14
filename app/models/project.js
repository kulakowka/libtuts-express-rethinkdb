
'use strict'

var slug = require('slug')
var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
var Tutorial = require('./tutorial')
var Language = require('./language')
var User = require('./user')

var Project = thinky.createModel('Project', {
  id: type.string(),
  name: type.string(),
  slug: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Project.ensureIndex('slug')

// Project.hasAndBelongsToMany(Tutorial, 'tutorials', 'id', 'id')
// Project.hasAndBelongsToMany(Language, 'languages', 'id', 'id')
Project.belongsTo(User, 'author', 'authorId', 'id')

// marked content
Project.pre('save', function (next) {
  let name = this.name.replace(/\+/g, 'p').replace(/\#/g, 'sharp')
  this.slug = slug(name).toLowerCase()
  next()
})

module.exports = Project
