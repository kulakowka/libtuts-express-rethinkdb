'use strict'

var path = require('path')
var router = require('express').Router()
var expressValidator = require('express-validator')
var Controller = require('express-api-controller')
var controllers = Controller(path.resolve(__dirname, '../controllers'))
var passport = require('passport')

var isUser = passport.authenticate('jwt-bearer', { session: false })

router.use(expressValidator())

router
  .route('/api/v1/comments')
    .get(controllers.api.v1.comments.index)
    .post(isUser, controllers.api.v1.comments.create)

router
  .route('/api/v1/comments/:id')
    .get(controllers.api.v1.comments.show)
    .put(isUser, controllers.api.v1.comments.update)
    .delete(isUser, controllers.api.v1.comments.delete)

router
  .route('/api/v1/languages')
    .get(controllers.api.v1.languages.index)
    .post(isUser, controllers.api.v1.languages.create)

router
  .route('/api/v1/languages/:slug')
    .get(controllers.api.v1.languages.show)
    .put(isUser, controllers.api.v1.languages.update)
    .delete(isUser, controllers.api.v1.languages.delete)

router
  .route('/api/v1/languages/:slug/tutorials')
    .get(controllers.api.v1.languages.tutorials)

// router.route('/api/v1/languages/:slug/projects')
//   .get(controllers.api.v1.languages.projects)

router
  .route('/api/v1/projects')
    .get(controllers.api.v1.projects.index)
    .post(isUser, controllers.api.v1.projects.create)

router
  .route('/api/v1/projects/:slug')
    .get(controllers.api.v1.projects.show)
    .put(isUser, controllers.api.v1.projects.update)
    .delete(isUser, controllers.api.v1.projects.delete)

// router.route('/api/v1/projects/:id/tutorials')
//   .get(controllers.api.v1.projects.tutorials)

router
  .route('/api/v1/tutorials')
    .get(controllers.api.v1.tutorials.index)
    .post(isUser, controllers.api.v1.tutorials.create)

router
  .route('/api/v1/tutorials/:id')
    .get(controllers.api.v1.tutorials.show)
    .put(isUser, controllers.api.v1.tutorials.update)
    .delete(isUser, controllers.api.v1.tutorials.delete)

// router.route('/api/v1/tutorials/:id/comments')
//   .get(controllers.api.v1.tutorials.comments)

router
  .route('/api/v1/users')
    .get(controllers.api.v1.users.index)
    .post(controllers.api.v1.users.create)

router
  .route('/api/v1/users/me')
    .get(isUser, controllers.api.v1.users.me)

router
  .route('/api/v1/users/:username')
    .get(controllers.api.v1.users.show)
    .put(isUser, controllers.api.v1.users.update)
    .delete(isUser, controllers.api.v1.users.delete)

router.route('/api/v1/users/:username/tutorials')
  .get(controllers.api.v1.users.tutorials)

router.route('/api/v1/users/:username/comments')
  .get(controllers.api.v1.users.comments)

router.route('/api/v1/users/:username/projects')
  .get(controllers.api.v1.users.projects)

router
  .route('/api/v1/tokens')
    .post(controllers.api.v1.tokens.create)

module.exports = router
