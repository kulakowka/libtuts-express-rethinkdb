'use strict'

const { Project } = require('models')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    const slug = req.params.slug
    const data = yield Project.filter({slug}).getJoin({ author: true }).run().then((items) => (items.length && items.pop()))
    if (!data) return res.status(404).json({message: 'Language not found'})
    res.json(data)
  }

}
