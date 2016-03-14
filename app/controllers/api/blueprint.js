// const r = require('utils/thinky').r
// const router = require('express').Router()

// // find
// router.get('/api/v1/:model', findModels)
// router.post('/api/v1/:model', createModel)

// router.get('/api/v1/:model/:id', findModel)
// router.put('/api/v1/:model/:id', updateModel)
// router.delete('/api/v1/:model/:id', deleteModel)

// router.get('/api/v1/:model/:id/:field', getField)

// const ITEMS_PER_PAGE = 30
// const models = {
//   user: {
//     Model: require('models/user'),
//     idField: 'username'
//   }
// }

// // GET /api/v1/:model

// function * findModels (req, res, next) {
//   const model = req.params.model
//   const limit = req.query.limit && req.query.limit < ITEMS_PER_PAGE ? req.query.limit : ITEMS_PER_PAGE
//   const Model = models[model].Model

//   let data = yield Model.orderBy(r.desc('createdAt')).limit(limit).run()

//   res.json(data)
// }

// // POST /api/v1/:model

// function * createModel (req, res, next) {
//   const model = req.params.model
//   const Model = models[model].Model

//   let item = new Model(req.body)
//   let data = yield item.save()

//   res.json(data)
// }

// // GET /api/v1/:model/:id

// function * findModel (req, res, next) {
//   const model = req.params.model
//   const id = req.params.id
//   const Model = models[model].Model
//   const idField = models[model].idField

//   let items = yield Model.filter({[idField]: id}).run()
//   let item = items.pop()

//   if (!item) return res.status(404).json({ message: model + ' not found' })

//   res.json(item)
// }

// // PUT /api/v1/:model/:id

// function * updateModel (req, res, next) {
//   const model = req.params.model
//   const id = req.params.id
//   const Model = models[model].Model
//   const idField = models[model].idField

//   let items = yield Model.filter({[idField]: id}).run()
//   let item = items.pop()

//   if (!item) return res.status(404).json({ message: model + ' not found' })

//   let data = yield item.merge(req.body).save()

//   res.json(data)
// }

// // DELETE /api/v1/:model/:id

// function * deleteModel (req, res, next) {
//   const model = req.params.model
//   const id = req.params.id
//   const Model = models[model].Model
//   const idField = models[model].idField

//   let items = yield Model.filter({[idField]: id}).run()
//   let item = items.pop()

//   if (!item) return res.status(404).json({ message: model + ' not found' })

//   let data = yield item.delete()

//   res.json(data)
// }

// // GET /api/v1/:model/:id/:field

// function * getField (req, res, next) {
//   const model = req.params.model
//   const id = req.params.id
//   const field = req.params.field
//   const Model = models[model].Model
//   const idField = models[model].idField

//   let items = yield Model.filter({[idField]: id}).withFields(field).run()
//   let item = items.pop()

//   if (!item) return res.status(404).json({ message: model + ' not found' })

//   res.json(item)
// }

