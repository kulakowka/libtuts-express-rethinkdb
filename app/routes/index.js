'use strict'

var path = require('path')
var router = require('express').Router()
var expressValidator = require('express-validator')
var Controller = require('express-api-controller')
var controllers = Controller(path.resolve(__dirname, '../controllers'))
var passport = require('passport')

router.use(expressValidator())

var isUser = passport.authenticate('jwt-bearer', { session: false })

// Accounts
router.route('/api/v1/users')
  .get(controllers.api.v1.users.index)
  .post(controllers.api.v1.users.create)

router.route('/api/v1/users/me')
  .get(isUser, controllers.api.v1.users.me)

router.route('/api/v1/users/:id')
  .get(controllers.api.v1.users.show)
  .put(isUser, controllers.api.v1.users.update)
  .delete(isUser, controllers.api.v1.users.delete)

router.route('/api/v1/token')
  .post(controllers.api.v1.token.create)

module.exports = router
