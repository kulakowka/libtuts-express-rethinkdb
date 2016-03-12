'use strict'

var path = require('path')
var router = require('express').Router()
var expressValidator = require('express-validator')
var Controller = require('express-api-controller')
var controllers = Controller(path.resolve(__dirname, '../controllers'))
var passport = require('passport')

router.use(expressValidator())

router
  .get('/api/v1/accounts', controllers.api.v1.accounts.index)
  .post('/api/v1/accounts', controllers.api.v1.accounts.create)
  .get('/api/v1/accounts/:id', controllers.api.v1.accounts.show)
  .put('/api/v1/accounts/:id', controllers.api.v1.accounts.update)
  .delete('/api/v1/accounts/:id', controllers.api.v1.accounts.delete)

router
  .post('/api/v1/auth/local', passport.authenticate('local'))

module.exports = router
