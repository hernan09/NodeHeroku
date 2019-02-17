const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const rout = require('./router/rotes')
const morgan = require('morgan')
const multer = require('multer')
    //const nodemailer = require('nodemailer')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads/'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }

})






const app = express()



//multer
app.use(multer({ storage }).single('foto'))
    //morgan

app.use(morgan('dev'))
    //handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
    //puerto
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({
    extended: true,

}))

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