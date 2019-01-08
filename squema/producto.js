const mongose = require('mongoose')
const schema = mongose.Schema


let producto = new schema({
    name: { type: String },
    price: { type: Number, default: 0 }


})

module.exports = mongose.model('producto', producto)