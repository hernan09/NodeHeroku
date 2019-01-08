const producto = require('../squema/producto')


function Mostrar(req, res) {
    producto.find({}, (err, producto) => {
        if (err) res.status(500).send(`${err}`)
        if (!producto) res.status(404).send({ mensaje: 'no se ha encontrado los producto' })
        res.render('index', { producto })


    })
}

function Enviar(req, res) {
    let producto1 = new producto()
    producto1.name = req.body.name,
        producto1.price = req.body.price


    producto1.save((err, producto1) => {
        if (err) res.status(500).send(`${err}`)
        res.redirect('/product')

    })
}

function eliminar(req, res) {
    let ProductId = req.params.ProductId
    producto.findByIdAndDelete(ProductId, (err, producto) => {
        if (err) res.status(500).send(`${err}`)
        if (!producto) res.status(404).send('no se a encontrado el producto')

        res.redirect('/product')
    })


}

function edit(req, res) {
    let id = req.params.id

    producto.findById(id, (err, producto) => {
        if (err) res.status(500).send(`${err}`)
        res.render('show', { data: producto })

    })
}


function update(req, res) {
    let id = req.params.id
    let cuerpo = req.body
    producto.findByIdAndUpdate(id, cuerpo, (err, producto) => {
        if (err) res.status(500).send(`${err}`)
        res.redirect('/product')
    })
}

module.exports = {
    Enviar,
    Mostrar,
    eliminar,
    edit,
    update

}