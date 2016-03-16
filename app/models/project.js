
'use strict'

var slug = require('slug')
var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
var Tutorial = require('models/tutorial')
var Language = require('models/language')
var User = require('models/user')

var Project = thinky.createModel('Project', {
  id: type.string(),
  name: type.string(),
  slug: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Project.ensureIndex('slug')

// marked content
Project.pre('save', function (next) {
  let name = this.name.replace(/\+/g, 'p').replace(/\#/g, 'sharp')
  this.slug = slug(name).toLowerCase()
  next()
})

module.exports = Project
