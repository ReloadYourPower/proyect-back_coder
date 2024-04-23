const express = require('express');
const PORT = 8080;
const  { Router } = require('express');

const ProductManager = require('../../productManager.js');

const app = express();
const manager = new ProductManager();
const route = Router();
app.use(express.urlencoded({ extended: true }));

// Ruta principal para los productos
route.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        let { limit } = req.query;

        if (limit) {
            limit = parseInt(limit);
            if (isNaN(limit)) {
                return res.status(400).send('El parámetro limit debe ser un número');
            }
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }

        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});
// Manejar la búsqueda de un producto por ID
route.get('/:pid', async (req, res) => { 
    try {
        let idProduct = req.params.pid;
        const product = await manager.getProductById(idProduct); // Se pasa el ID del producto como argumento
        if (product) {
            res.json({ product }); //  El nombre de la propiedad debe ser "product"
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el producto');
        console.error();
    }
});

// Manejar la adición de un nuevo producto 
route.post(`/`, async (req, res) => {
    const { title, description, price, stock,status, thumbnaild, code, category } = req.body;
    try {
        await manager.addProduct(title, description, price, stock,status, thumbnaild, code,category);
        res.send('Producto agregado correctamente');
    } catch (error) {
        res.status(500).send('Error al agregar el producto');
    }
});
// Manejar la actualización de un producto
route.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    console.log('Datos recibidos en la solicitud:', updatedData); // Verifica los datos del cuerpo de la solicitud

    try {
        const updated = await manager.updateProduct(productId, updatedData);
        console.log('Producto actualizado:', updated); // Verifica si la actualización se realizó correctamente
        if (updated) {
            res.send('Producto actualizado correctamente');
        } else {
            res.status(404).send(`Producto con ID ${productId} no encontrado`);
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error); // Registra cualquier error que ocurra
        res.status(500).send('Error al actualizar el producto');
    }
});
// Manejar la eliminación de un producto
route.delete('/:id',async(req, res) => {
    const productId = req.params.id; // Obtén el ID del producto de los parámetros de la ruta

    try {
        const deletedProduct = await manager.deleteProduct(productId);
        if (deletedProduct) {
            res.send('Producto eliminado correctamente');
        } else {
            res.status(404).send(`Producto con ID ${productId} no encontrado`);
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el producto');
    }
})

module.exports= route;