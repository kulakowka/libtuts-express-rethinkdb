'use strict'

var express = require('express')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var passport = require('middlewares/passport')
var routes = require('routes/index')
var responseTime = require('response-time')
var errorHandler = require('api-error-handler')
var helmet = require('helmet')
var compression = require('compression')

var app = express()
  .use(helmet())
  .use(compression())
  .use(responseTime())
  .use(logger('dev'))
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(passport.initialize())
  .use('/', routes)
  .use(errorHandler())

module.exports = app
