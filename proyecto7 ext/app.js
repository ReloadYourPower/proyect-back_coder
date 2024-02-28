const express = require('express');
const app = express();
const PORT = 3001;
const ProductManager = require('./productManager');

app.use(express.urlencoded({ extends: true }));

const manager = new ProductManager();

app.get(`/`, (req, res) => {
    res.send(`<h1>Hola desde el servidor express inicio</h1>`);
});

// Agregar un nuevo producto
app.post('/add', async (req, res) => {
    const { title, description, price, stock, thumbnaild, code } = req.body;
    try {
        await manager.addProduct(title, description, price, stock, thumbnaild, code);
        res.send('Producto agregado correctamente');
    } catch (error) {
        res.status(500).send('Error al agregar el producto');
    }
});

// Obtener todos los productos
app.get('/see', async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await manager.getProducts();
        let consultas = req.query;
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

app.get('/products/:pid', async (req, res) => {
    try {
        const products = await manager.getProducts();
        let idProduct = req.params.pid;
        let producto = products.find(product => product.id === parseInt(idProduct));
        if (producto) {
            res.json({ producto });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el producto');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
