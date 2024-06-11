const express = require('express');
const exphbs = require('express-handlebars');
const { faker } = require('@faker-js/faker');
const winston = require('winston');
const path = require('path');

const app = express();

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// Asegúrate de que el directorio de vistas esté configurado correctamente
app.set('views', path.join(__dirname, 'views'));

// Configuración del logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});

// Middleware de logging
app.use((req, res, next) => {
  req.log = logger;
  next();
});

// Generación de productos falsos
const generateProducts = (count = 10) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      _id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      image: faker.image.url()
    });
  }
  return products;
};

// Rutas
app.get('/', (req, res) => {
  const products = generateProducts();
  res.render('products', { products });
  req.log.debug('Products rendered');
});

app.get('/loggerTest', (req, res) => {
  req.log.debug('Debug message');
  req.log.http('HTTP message');
  req.log.info('Info message');
  req.log.warn('Warning message');
  req.log.error('Error message');
  req.log.fatal('Fatal message');
  res.send('Logger test completed');
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  req.log.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
