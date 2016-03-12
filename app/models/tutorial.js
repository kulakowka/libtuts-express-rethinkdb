'use strict'

var User = require('models/user')
var thinky = require('utils/thinky')
var type = thinky.type

var Tutorial = thinky.createModel('Tutorial', {
  id: type.string(),
  title: type.string().max(100).required(),
  source: type.string().max(2000),
  domain: type.string(),
  content: type.string().max(200000),
  html: type.string(),
  keywords: [type.string().max(100)],
  projects: [type.string().max(100)],
  languages: [type.string().max(100)],
  idAuthor: type.string().required()
})

Tutorial.belongsTo(User, 'author', 'idAuthor', 'id')

module.exports = Tutorial
