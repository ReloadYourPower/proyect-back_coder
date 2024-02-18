// Importa el módulo 'fs' para trabajar con archivos
const fs = require('fs');

class ProductManager {
    constructor() {
        this.nextId = 1;
        this.products = [];
        this.fileName = 'products.json'; // Nombre del archivo JSON
        this.loadProductsFromFile(); // Carga los productos del archivo JSON al inicializar
    }

    addProduct(title, description, price, stock, thumbnaild, code) {
        const id = this.nextId++;
        const newProduct = {
            id,
            title,
            description,
            price,
            stock,
            thumbnaild,
            code
        };

        if (this.codeExist(code)) {
            console.log(`El código ${code} ya existe en otro producto.`);
        } else {
            this.products.push(newProduct);
            console.log(`Producto ${title} agregado al inventario con ID ${id}.`);
            this.saveProductsToFile(); // Guarda los productos en el archivo JSON
        }
    }

    codeExist(code) {
        return this.products.some(product => product.code === code);
    }
    updateProduct(id, newData) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...newData };
            console.log(`Producto con ID ${id} actualizado.`);
            this.saveProductsToFile(); // Guarda los productos actualizados en el archivo JSON
            return true;
        } else {
            console.error(`Producto con ID ${id} no encontrado.`);
            return false;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(`Datos del producto con ID: ${product.id}`)
            return product;
        } else {
            console.error(`Producto con ID ${id} no encontrado.`);
            return null; // Retorna null para indicar que el producto no se encontró
        }
    }

    deleteProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1);
            console.log(`Producto con ID ${id} eliminado.`);
            this.saveProductsToFile(); // Guarda los productos actualizados en el archivo JSON
            return deletedProduct;
        } else {
            console.error(`Producto con ID ${id} no encontrado.`);
            return null;
        }
    }
    loadProductsFromFile() {
        try {
            // Lee el contenido del archivo JSON y lo convierte a un array de productos
            const data = fs.readFileSync(this.fileName, 'utf8');
            this.products = JSON.parse(data);
            console.log(`Productos cargados desde ${this.fileName}.`);
            // Actualiza el nextId al máximo ID existente más 1
            this.nextId = Math.max(...this.products.map(product => product.id)) + 1;
        } catch (error) {
            console.log(`No se pudo cargar el archivo ${this.fileName}:`, error);
        }
    }
    saveProductsToFile() {
        // Convierte el array de productos a formato JSON
        const data = JSON.stringify(this.products, null, 2);
        // Escribe el JSON en el archivo especificado
        fs.writeFileSync(this.fileName, data);
        console.log(`Productos guardados en ${this.fileName}.`);
    }


    }

// Ejemplo de uso
const manager = new ProductManager();
manager.addProduct('Título', 'Descripción', 10, 100, 'imagen.jpg', 'ABC123');
manager.addProduct('Título1', 'Descripción1', 10, 100, 'imagen1.jpg', 'ABC1243');
manager.addProduct('Título2', 'Descripción1¡', 10, 100, 'imagen2.jpg', 'AB4C123');



console.log("Todos los productos:");
console.log(manager.getProducts());


console.log(manager.getProductById(2));


console.log(manager.getProductById(3));

// Modifica el producto con ID 1
manager.updateProduct(1, { title: 'Nuevo Título', price: 20 });

// console.log(manager.deleteProduct(2));

// console.log("Todos los productos:");
// console.log(manager.getProducts());
