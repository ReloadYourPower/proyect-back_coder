// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const fs = require('fs');
// const router = express.Router();
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const path = require('path');


// // Manejar la ruta de la página de inicio
// router.get('/', (_, res) => {
//     // Obtener la ruta completa del archivo JSON
//     const filePath = path.join(__dirname, '..', '..',  'products.json');

//     // Cargar datos del archivo JSON
//     const productsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//     // Renderizar la vista home con los datos de los productos
//     res.render('realTime', { products: productsData });
//     console.log('Cliente conectado')
    
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const DataBaseManager = require('../../DAO/monongoDB/dataBase');

// Crear una instancia del administrador de la base de datos
const mongo = new DataBaseManager();

// Manejar la ruta de la página de inicio
router.get('/', async (_, res) => {
    try {
        // Realizar una consulta a la base de datos MongoDB para obtener todos los productos
        const products = await mongo.readAllDocuments('productsManager', 'products');
        
        // Renderizar la vista home con los datos de los productos
        res.render('realTime', { products: products });
    } catch (error) {
        // Manejar errores de consulta a la base de datos
        console.error('Error al obtener los productos desde MongoDB:', error);
        // Responder con un mensaje de error en caso de falla
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
