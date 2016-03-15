'use strict'

// Settings

const TIMES = 1   // создать N раз
const COUNT = 5   // N аккаунтов

// Run

var User = require('models/user')
var faker = require('faker')
var _ = require('lodash')
var debug = require('debug')
var thinky = require('utils/thinky')
var log = debug('seed:')
var humanizeDuration = require('humanize-duration')
var numeral = require('numeral')

numeral.language('ru', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'тыс.',
    million: 'млн',
    billion: 'b',
    trillion: 't'
  },
  ordinal () {
    return '.'
  },
  currency: {
    symbol: 'руб.'
  }
})

numeral.language('ru')

let total = 0
let startTime = new Date()

thinky.r
.tableDrop('User')
.run((result) => {
  log('User table dropped')

  createFakeUsers(TIMES, COUNT)
  .then(() => {
    let resultTime = humanizeDuration(new Date() - startTime)
    let resultCount = numeral(total).format('0,0')

    log('%s Users created: %s', resultCount, resultTime)
    process.exit()
  })
  .catch(console.log)
})

function createFakeUsers (times, count) {
  let users = _.times(count, createFakeUser)

  return User
  .insert(users)
  .execute()
  .then((result) => {
    times--
    total = total + count
    log('times: %d count: %d total: %d', times, count, total)
    if (times) return createFakeUsers(times, count)
    return result
  })
}

function createFakeUser () {
  let createdAt = faker.date.past()
  let updatedAt = faker.date.past()
  let email = faker.internet.email().toLowerCase()
  let password = faker.internet.password()
  let fullName = faker.name.firstName() + ' ' + faker.name.lastName()
  let username = fullName.replace(/\W/, '-').toLowerCase()

  return {
    fullName,
    username,
    email,
    password,
    createdAt,
    updatedAt
  }
}
