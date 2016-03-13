'use strict'

var passport = require('passport')
var JwtBearerStrategy = require('passport-http-jwt-bearer').Strategy
var BearerStrategy = require('passport-http-bearer').Strategy
var LocalStrategy = require('passport-local').Strategy
var Account = require('models/account')

var jwt = require('jsonwebtoken')

const TOKEN_SECRET = 'token secret string'

// Configure authentication strategies

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      Account.getBy({
        email: email.trim().toLowerCase()
      })
      .then((account) => {
        if (!account) return done(null, false, { message: 'Incorrect email.' })
        account.checkPassword(password, (err, result) => {
          if (err || !result) return done(null, false, { message: 'Incorrect password.' })
          delete account.password
          return done(null, account)
        })
      })
      .catch(done)
    }
  )
)

passport.use(new JwtBearerStrategy(
  TOKEN_SECRET,
  function (token, done) {
    Account.get(token.id).run().then((account) => {
      if (!account) return done(null, false)
      return done(null, account, token)
    }).catch(done)
  }
))

module.exports = passport
