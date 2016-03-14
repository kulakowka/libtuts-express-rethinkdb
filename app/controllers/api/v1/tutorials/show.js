'use strict'

const Tutorial = require('models/tutorial')

module.exports = {

  // Action logic middleware
  action: function * (req, res, next) {
    const id = req.params.id
    const data = yield Tutorial.filter({id}).getJoin({ author: true }).run().then((items) => (items.length && items.pop()))
    if (!data) return res.status(404).json({message: 'Tutorial not found'})
    res.json(data)
  }

}
