'use strict'

// Settings

const TIMES = 10   // создать N раз
const COUNT = 100   // N аккаунтов

// Run

var Account = require('models/account')
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
.tableDrop('Account')
.run((result) => {
  log('Account table dropped')

  createFakeAccounts(TIMES, COUNT)
  .then(() => {
    let resultTime = humanizeDuration(new Date() - startTime)
    let resultCount = numeral(total).format('0,0')

    log('%s accounts created: %s', resultCount, resultTime)
    process.exit()
  })
  .catch(console.log)
})

function createFakeAccounts (times, count) {
  let accounts = _.times(count, createFakeAccount)

  return Account
  .insert(accounts)
  .execute()
  .then((result) => {
    times--
    total = total + count
    log('times: %d count: %d total: %d', times, count, total)
    if (times) return createFakeAccounts(times, count)
    return result
  })
}

function createFakeAccount () {
  let createdAt = faker.date.past()
  let updatedAt = faker.date.past()
  let email = faker.internet.email().toLowerCase()
  let password = faker.internet.password()

  return {
    email,
    password,
    createdAt,
    updatedAt
  }
}
