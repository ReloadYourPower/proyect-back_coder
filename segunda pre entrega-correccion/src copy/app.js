const express = require('express');
const app = express();
const PORT = 8080;
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const home = require('../src copy/router/products/home.route');
const realTimeRoute = require('../src copy/router/products/realTime.route');
const chat = require('../src copy/router/products/chat.route')
const login = require('../src copy/router/products/login.route')
const { Server } = require('socket.io');
const httpServer = app.listen(PORT, () => {
    
});
const helpers = {
    // Helper para verificar si un valor es mayor que otro
    gt: function(a, b) { return a > b; },
    // Helper para verificar si un valor es menor que otro
    lt: function(a, b) { return a < b; },
    // Definir el helper 'eq' que verifica si dos valores son iguales
    eq: function(arg1, arg2, options) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
    // Helper para obtener la página anterior
    prev: function(currentPage) { return currentPage - 1; },
    // Helper para obtener la página siguiente
    next: function(currentPage) { return currentPage + 1; }
};
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs.engine({
    helpers,
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

// Usar la ruta de la página de inicio
app.use('/', home);
app.use('/realTimeRoute', realTimeRoute);
app.use('/chat', chat);
app.use('/login', login);

// Importar y configurar la lógica de los sockets
const socketLogic = require('./socketLogic');
socketLogic.initializeSocket(httpServer);

console.log(`Servidor escuchando en http://localhost:${PORT}`);
