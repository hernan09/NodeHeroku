const producto = require('../squema/producto')
const nodemailer = require('nodemailer')


function Mostrar(req, res) {
    producto.find({}, (err, producto) => {
        if (err) res.status(500).send(`${err}`)
        if (!producto) res.status(404).send({ mensaje: 'no se ha encontrado los producto' })
        res.render('index', { producto })


    })
}



function fot(req, res) {
    producto.find({}, (err, producto) => {
        if (err) res.status(500).send(`${err}`)
        if (!producto) res.status(404).send({ mensaje: 'no se ha encontrado los producto' })

        res.render('fot', { producto })
    })
}


function Enviar(req, res) {



    let producto1 = new producto()
    producto1.name = req.body.name,
        producto1.price = req.body.price,
        producto1.foto = '/uploads/' + req.file.originalname



    console.log(req.file)
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
    let cuerpo = {
        name: req.body.name,
        price: req.body.price,
        foto: '/uploads/' + req.file.originalname
    }
    console.log(req.file)
    producto.findByIdAndUpdate(id, cuerpo, (err, producto) => {
        if (err) res.status(500).send(`${err}`)
        res.redirect('/product')
    })
}

function email(req, res) {
    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'hernag_09@hotmail.com',
            pass: 'asdasdasdas'
        },

        tls: {
            rejectUnauthorized: false
        }

    })

    let mailoptions = {
        from: 'hernan',
        to: 'hernag_09@hotmail.com',
        subject: 'heroku',
        text: 'name' + req.body.name + 'mail' + req.body.email + 'message' + req.body.message,
        html: '<ul><li>' + req.body.name + '</li><li>' + req.body.email + '</li></ul>' + '<p>' + req.body.message + '</p>'

    }

    transporter.sendMail(mailoptions, (error, info) => {
        if (error) console.log(`${error}`)
        else {
            console.log(info)
            res.redirect('/product')
        }
    })
}

module.exports = {
    Enviar,
    Mostrar,
    eliminar,
    edit,
    update,
    fot,
    email

}