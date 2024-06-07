const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { faker } = require('@faker-js/faker');
const mockingRoutes = require('./routes/mocking');
const errorHandler = require('./middlewares/errorHandler');
const errorDictionary = require('./errors/errorDictionary');

const app = express();
const PORT = 3000;

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// Asegúrate de que el directorio de vistas esté configurado correctamente
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener productos mockeados en formato JSON
app.use('/mockingproducts', mockingRoutes);

// Middleware para generar productos mockeados
app.use((req, res, next) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      _id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      image: faker.image.url()
    });
  }
  req.mockedProducts = products;
  next();
});

// Ruta para mostrar la vista de productos mockeados
app.get('/products', (req, res, next) => {
  try {
    const products = req.mockedProducts;
    // console.log('Productos:', products);
    res.render('products', { products }, (err, html) => {
      if (err) {
        console.error('Error al renderizar la vista:', err);
        return next(new Error('VIEW_NOT_LOADED'));
      }
      // console.log('HTML enviado:', html);
      res.send(html);
    });
  } catch (err) {
    next(new Error('VIEW_NOT_LOADED'));
  }
});



// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message); // Agregamos esto para verificar el mensaje de error
  const errorResponse = errorDictionary[err.message] || errorDictionary['UNKNOWN_ERROR'];
  const errorMessage = errorResponse.message || 'Error desconocido';
  res.status(errorResponse.status).json({ error: errorMessage });
});


// Ruta para simular un error de producto no encontrado
app.get('/products/notfound', (req, res, next) => {
  next(new Error('PRODUCT_NOT_FOUND'));
});

// Ruta para simular un error de carrito vacío
app.get('/cart/empty', (req, res, next) => {
  next(new Error('CART_EMPTY'));
});

// Ruta para simular un error desconocido
app.get('/errors/unknown', (req, res, next) => {
  next(new Error('UNKNOWN_ERROR'));
});
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
