'use strict'

var thinky = require('utils/thinky')
var type = thinky.type
var r = thinky.r
var ValidationError = thinky.Errors.ValidationError
var bcrypt = require('bcrypt')
var validator = require('validator')

// Какие запросы будем использовать?

// 1. Получение пользователя по username
module.exports.get = (username) => User.filter({data: { username }}).find().run().then((users) => users.length ? users.pop() : null)

/**
 * Опишем схему модели пользователя
 */
var User = thinky.createModel('User', {
  id: type.string(),

  data: type.object().schema({
    username: type.string().min(3).max(20).lowercase().required().allowNull(false).validator(validator.isAlphanumeric),
    fullname: type.string().min(3).max(40),
    about: type.string().max(240),
    website: type.string().validator(validator.isUrl)
  }).removeExtra(),

  meta: type.object().schema({
    comments: type.number().default(0),
    posts: type.number().default(0),
    created: type.date().default(r.now()),
    updated: type.date().default(r.now())
  }),

  account: type.object().schema({
    email: type.string().required().lowercase().allowNull(false).validator(validator.isEmail),
    password: type.string().required().allowNull(false)
  }).removeExtra()
})

/**
 * Методы экземпляра модеи
 * user.checkPassword()
 */
User.define('checkPassword', function (password, callback) {
  bcrypt.compare(password, this.password, callback)
})

/**
 * Хук который проверяет что юзернейм который указал
 * пользователь не занят другим пользователем.
 */
User.pre('save', function (next) {
  console.log('pre', this)

  User.filter({
    account: {
      email: this.account.email
    }
  })
  .count()
  .execute()
  .then((count) => {
    if (count) return next(new ValidationError('Email is invalid or already taken.'))
    next()
  })
  .catch(next)
})

/**
 * Хук который хэширует пароль
 */
User.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

module.exports = User
