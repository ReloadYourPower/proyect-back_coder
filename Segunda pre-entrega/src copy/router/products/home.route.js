// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const path = require('path');


// // Manejar la ruta de la página de inicio
// router.get('/', (_, res) => {
//     // Obtener la ruta completa del archivo JSON
//     const filePath = path.join(__dirname, '..', '..',  'products.json');

//     // Cargar datos del archivo JSON
//     const productsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//     // Renderizar la vista home con los datos de los productos
//     res.render('index', { products: productsData });
    
// });

// module.exports = router;

const Router = require('express');
const router = Router();
const DataBaseManager = require('../../DAO/monongoDB/dataBase');
const Product = require('./products');



// Crear una instancia del administrador de la base de datos
const mongo = new DataBaseManager();

// Manejar la ruta de la página de inicio con filtrado, paginación y ordenamiento
router.get('/', async (req, res) => {
       try {
        const data = req.query;
        console.log('data obtenida :',data);
        let  products, totalCount, totalPages, currentPage;
        if (data) {
            const { products, totalCount, totalPages, currentPage } = Product(data);

        } 
        else {
            const { products, totalCount, totalPages, currentPage } = Product(data);
            console.log('Productos:',products);

        };

         // Renderizar la vista home con los datos de los productos
         res.render('index', {
            products,
            totalCount,
            totalPages,
            currentPage
           });
        
        

      
       
      
       
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.render('error'); // Renderizar una vista de error en caso de fallo
    }
     
})


module.exports = router;
