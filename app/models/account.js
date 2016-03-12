'use strict'

var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
// var ValidationError = thinky.Errors.ValidationError
var bcrypt = require('bcrypt')
var validator = require('validator')

var Account = thinky.createModel('Account', {
  id: type.string(),
  email: type.string().required().lowercase().allowNull(false).validator(validator.isEmail),
  password: type.string().required().allowNull(false),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
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

/**
 * Хук который хэширует пароль
 */
Account.pre('save', function (next) {
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
