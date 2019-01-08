const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const rout = require('./router/rotes')
    //const morgan = require('morgan')


let app = express()


//morgan

//app.use(morgan('dev'))
//handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
    //puerto
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({ extended: false }))

//rutas
app.use('/', rout)
    //public

app.use(express.static(path.join(__dirname, 'public')))

//mongoose
mongoose.connect('mongodb://localhost:27017/productos', {
    useNewUrlParser: true
}, (err) => {
    if (err) console.log(`${err}`)

    console.log('se a conectado a la base de datos')

    app.listen(app.get('port'), (err) => {
        if (err) console.log(`${err}`)

        console.log('server runing in http://localhost:3000')
    })

})