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
      passwordField: 'password'
    },
    function (email, password, done) {
      User.getBy({
        email: email.trim().toLowerCase()
      })
      .then((user) => {
        if (!user) return done(null, false, { message: 'Incorrect email.' })
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
    User.getBy({id: token.id}).then((user) => {
      // console.log('token', token, user)
      if (!user) return done(null, false)
      return done(null, user, token)
    }).catch(done)
  }
))

module.exports = passport
