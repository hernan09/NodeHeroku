const express = require('express')
const api = express.Router()
const handler = require('../handler/handler')

api.get('/product', handler.Mostrar)
api.post('/add', handler.Enviar)
api.get('/delete/:ProductId', handler.eliminar)
api.get('/edit/:id', handler.edit)
api.post('/update/:id', handler.update)



module.exports = api