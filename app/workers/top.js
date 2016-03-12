'use strict'

var debug = require('debug')
var log = debug('top:')
var Account = require('models/account')
var thinky = require('utils/thinky')
var r = thinky.r

getTopBy(Account, 'createdAt', 10, ['email', 'id']).then((result) => {
  log('Accounts by createdAt:')
  result.forEach((a, i) => log('%d - %s %s', i, a.email, a.id))
  process.exit()
})

function getTopBy (Model, field, limit, pluck) {
  return Model
  .orderBy(r.desc(field))
  .limit(limit)
  .pluck(pluck)
  .execute()
}
