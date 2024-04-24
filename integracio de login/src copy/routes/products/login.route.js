const Router = require('express');
const router = Router();
// const DataBaseManager = require('../../DAO/monongoDB/dataBase');

// Crear una instancia del administrador de la base de datos
// const mongo = new DataBaseManager();

// Manejar la ruta de la página de inicio
router.get('/', async (_, res) => {
    try {
        // Realizar una consulta a la base de datos MongoDB para obtener todos los productos
        // const products = await mongo.readAllDocuments('productsManager', 'products');
        // Renderizar la vista home con los datos de los productos
        res.render('login');
    } catch (error) {
        // // Manejar errores de consulta a la base de datos
        // console.error('Error al obtener los productos desde MongoDB:', error);
        // // Responder con un mensaje de error en caso de falla
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;