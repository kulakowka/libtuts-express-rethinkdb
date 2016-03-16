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

// var pmx = require('pmx').init({
//   http: true, // HTTP routes logging (default: false)
//   http_latency: 200,  // Limit of acceptable latency
//   http_code: 500,  // Error code to track'
//   alert_enabled: true,  // Enable alerts (If you add alert subfield in custom it's going to be enabled)
//   ignore_routes: [/socket\.io/, /notFound/], // Ignore http routes with this pattern (default: [])
//   errors: true, // Exceptions loggin (default: true)
//   custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics (default: true)
//   network: true, // Network monitoring at the application level (default: false)
//   ports: true  // Shows which ports your app is listening on (default: false)
// })

var app = express()
  .use(helmet())
  .use(compression())
  .use(responseTime())
  .use(logger('dev'))
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(passport.initialize())
  .use('/', routes)
  .use(errorHandler())

module.exports = app
