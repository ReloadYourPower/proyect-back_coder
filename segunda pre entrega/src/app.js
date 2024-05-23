const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const loadProducts = require('./Controller/config/config'); // Importa la función de carga

// Cargar variables de entorno desde el archivo .env
dotenv.config();
let isProductsLoaded = false;
const { dbName, mongoUrl } = require('./DAO/dbConfig')
const sessionMiddleware = require('./DAO/session/mongoStorage')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(sessionMiddleware)
      // Cargar productos después de conectar a la base de datos, solo si no se han cargado aún
  if (!isProductsLoaded) {
     loadProducts();
    isProductsLoaded = true; // Actualizar la variable de control
  }
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/api/sessions', require('./DAO/routes/session.router'))
app.use('/', require('./DAO/routes/views.router'))

mongoose.connect(mongoUrl, { dbName }).then(() => {
    app.listen(8080, () => {
        console.log('Servidor listo!')
    })
})
