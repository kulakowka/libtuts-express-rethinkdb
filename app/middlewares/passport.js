var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var Account = require('models/account')

// Configure authentication strategies

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      Account
      .filter({
        email: email.trim().toLowerCase()
      })
      .run()
      .then((accounts) => {
        if (!accounts.length) return done(null, false, { message: 'Incorrect email.' })
        return accounts.pop()
      })
      .then((account) => {
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

// Configure persistent sessions

passport.serializeUser(function (account, done) {
  done(null, account.id)
})

passport.deserializeUser(function (id, done) {
  Account.get(id).run()
  .then(function (account) {
    done(null, account)
  })
  .catch(function (err) {
    done(err)
  })
})

module.exports = passport
