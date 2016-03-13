'use strict'

var path = require('path')
var router = require('express').Router()
var expressValidator = require('express-validator')
var Controller = require('express-api-controller')
var controllers = Controller(path.resolve(__dirname, '../controllers'))
var passport = require('passport')

router.use(expressValidator())

var isUser = passport.authenticate('bearer', { session: false })

// Settings
router.route('/api/v1/settings')
  .get(isUser, controllers.api.v1.settings.index)

// Accounts
router.route('/api/v1/accounts')
  .get(controllers.api.v1.accounts.index)
  .post(controllers.api.v1.accounts.create)

router.route('/api/v1/accounts/:id')
  .get(controllers.api.v1.accounts.show)
  .put(controllers.api.v1.accounts.update)
  .delete(controllers.api.v1.accounts.delete)

// отправляем сюда мыло и пароль - получаем временный токен
router.route('/api/v1/auth/local')
  .post(controllers.api.v1.auth.local)

// с этим токеном заходим сюда, если токена нет или он неверный - bad request
router.route('/api/v1/test/protected')
  .get(passport.authenticate('jwt-bearer', { session: false }), function (req, res) {
    res.json({
      protected: true,
      authInfo: req.authInfo,
      account: req.user
    })
  })

module.exports = router
