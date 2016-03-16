'use strict'

var passport = require('passport')
var JwtBearerStrategy = require('passport-http-jwt-bearer').Strategy
var LocalStrategy = require('passport-local').Strategy
var User = require('models/user')

const TOKEN_SECRET = 'token secret string'

// Configure authentication strategies

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    function (email, password, done) {
      email = email.trim().toLowerCase()
      User.filter({ email }).run().then((users) => {
        if (!users.length) return done(null, false, { message: 'Incorrect email.' })
        let user = users.pop()
        user.checkPassword(password, (err, result) => {
          if (err || !result) return done(null, false, { message: 'Incorrect password.' })
          delete user.password
          return done(null, user)
        })
      })
      .catch(done)
    }
  )
)

passport.use(new JwtBearerStrategy(
  TOKEN_SECRET,
  function (token, done) {
    return done(null, token, token)
  }
))

module.exports = passport
