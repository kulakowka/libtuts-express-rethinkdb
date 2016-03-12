'use strict'

const url = require('url')
const marked = require('marked')

module.exports = {
  getDomain (source) {
    let hostname = url.parse(source).hostname
    return hostname && hostname.replace(/^www./i, '')
  },

  marked (text) {
    return text && marked(text)
  }
}
