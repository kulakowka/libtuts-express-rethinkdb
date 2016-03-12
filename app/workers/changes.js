'use strict'

var debug = require('debug')
var log = debug('changes:')
var Account = require('models/account')
var _ = require('lodash')
var r = require('utils/thinky').r

var map = new Map()

Account.orderBy({ index: r.desc('updatedAt') }).limit(5).changes().then((feed) => {
  feed.each((err, doc) => {
    if (err) return console.log(err)

    if (doc.isSaved() === false) {
      map.delete(doc.id)
    } else {
      map.set(doc.id, doc)
      if (doc.getOldValue()) {
        map.delete(doc.getOldValue().id, doc.getOldValue())
      }
    }

    log('Now TOP looks like:')

    let arr = []
    map.forEach((item) => arr.push(_.pick(item, ['email', 'createdAt'])))
    arr = _.sortBy(arr, ['createdAt'])
    arr.reverse()
    arr.forEach((item) => log(item))
  })
})

