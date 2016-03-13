'use strict'

var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
// var ValidationError = thinky.Errors.ValidationError
var bcrypt = require('bcrypt')

var Account = thinky.createModel('Account', {
  id: type.string(),
  email: type.string(),
  password: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now()),
  profile: {
    github: type.number()
  },
  role: {
    admin: type.boolean(),
    editor: type.boolean(),
    commentator: type.boolean(),
    newbie: type.boolean()
  }
})

Account.ensureIndex('updatedAt')

// Account.pre('save', function (next) {
//   Account.filter({
//     email: this.email
//   })
//   .count()
//   .execute()
//   .then((count) => {
//     if (count) return next(new ValidationError('Email is invalid or already taken.'))
//     next()
//   })
//   .catch(next)
// })

/**
 * Методы экземпляра модеи
 * account.checkPassword()
 */
Account.define('checkPassword', function (password, callback) {
  bcrypt.compare(password, this.password, callback)
})

Account.defineStatic('getBy', function (filter, value) {
  return Account.filter(filter).run().then((items) => (items.length && items.pop()))
})

// Add newbie role
Account.pre('save', function (next) {
  if (this.role && this.role.newbie) return next()
  this.merge({
    role: {
      newbie: true
    }
  })
  next()
})

// Encrypt password
Account.pre('save', function (next) {
  if (!this.password) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

module.exports = Account
