const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const { dbName, mongoUrl } = require('./DAO/dbConfig')
const sessionMiddleware = require('./DAO/session/mongoStorage')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(sessionMiddleware)

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/api/sessions', require('./DAO/routes/session.router'))
app.use('/', require('./DAO/routes/views.router'))

mongoose.connect(mongoUrl, { dbName })
    .then(() => {
        app.listen(8080, () => {
            console.log('Servidor listo!')
        })
    })
