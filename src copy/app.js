const express = require('express');
const app = express();
const PORT = 8080;
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const home = require('../src copy/router/products/home.route');
const realTimeRoute = require('../src copy/router/products/realTime.route');
const chat = require('../src copy/router/products/chat.route')
const { Server } = require('socket.io');
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

// Usar la ruta de la página de inicio
app.use('/', home);
app.use('/realTimeRoute', realTimeRoute);
app.use('/chat', chat);

// Importar y configurar la lógica de los sockets
const socketLogic = require('./socketLogic');
socketLogic.initializeSocket(httpServer);


