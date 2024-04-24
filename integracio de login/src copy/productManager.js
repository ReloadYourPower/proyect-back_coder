const fs = require('fs');
const path = require('path');
const productsFile ='./products.json'; // ruta al archivo .json debe modificarse segun cambie la hubicacion del .json donde se almacenan los datos 
       
class ProductManager {
    
    constructor() {
        this.nextId = 1;
        this.products = [];
        this.fileName = 'products.json'; // Nombre del archivo JSON
        this.loadProductsFromFile(this.fileName); // Carga los productos del archivo JSON al inicializar
    }

    saveProductsToFile() {
        try {
            // Convierte el array de productos a formato JSON
            const data = JSON.stringify(this.products, null, 2);
    
            // Verifica si la ruta del archivo está definida
            if (!productsFile) {
                // Si la ruta no está definida, crea un nuevo archivo en la ruta '../src/products.json'
                fs.writeFileSync(path.join(__dirname, '../src/products.json'), data);
            } else {
                // Si la ruta está definida, escribe en el archivo especificado
                fs.writeFileSync(productsFile, data);
            }
            
            console.log(`Productos guardados en ${productsFile || 'el nuevo archivo creado'}.`);
            return true; // Retorna true para indicar que los productos se guardaron correctamente
        } catch (error) {
            console.error('Error al guardar los productos:', error);
            return false; // Retorna false para indicar que ocurrió un error al guardar los productos
        }
    }
    loadProductsFromFile(fileName) {
        try {
            const data = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
            this.products = JSON.parse(data);
            // console.log(`Productos cargados desde ${fileName}.`);
            this.nextId = Math.max(...this.products.map(product => product.id)) + 1;
            this.viewProduct = this.products; // Establece viewProduct igual a los productos cargados
        } catch (error) {
            console.log(`No se pudo cargar el archivo ${fileName}:`, error);
        }
    }
    addProduct(title, description, price, stock,status, thumbnaild, code,category) {
        const id = this.nextId++;
        const newProduct = {
            id,
            title,
            description,
            price,
            stock,
            status,
            thumbnaild,
            code,
            category
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

    updateProduct(id , newData) {
        console.log(`Actualizando producto con ID: ${id}`);
        console.log('Nuevos datos:', newData);
        
        const product = this.getProductById(id);
        if (product) {
            Object.assign(product, newData);
            console.log(`Producto con ID ${id} actualizado.`);
            this.saveProductsToFile(); // Guarda los productos actualizados en el archivo JSON
            return true;
        } else {
            console.error(`Producto con ID ${id} no encontrado.`);
            return false;
        }
    }
    
    

    getProducts() {
        try {
            // Leer el contenido del archivo products.json de forma sincrónica
            const productsData = fs.readFileSync(productsFile, 'utf8');

            // Convertir el contenido del archivo JSON en un objeto JavaScript
            const products = JSON.parse(productsData);

            return products;
        } catch (error) {
            // Manejar errores de lectura del archivo
            console.error('Error al leer el archivo products.json:', error);
            throw error; // Relanzar el error para manejarlo en el código que llama a este método
        }
    }

    getProductById(id) {
        const product = this.products.find(product => product.id == id);
        if (product) {
            console.log(`Datos del producto con ID: ${product.id}`);
            return product;
        } else {
            console.error(`Producto con ID ${id} no encontrado.`);
            return null; // Retorna null para indicar que el producto no se encontró
        }
    }
    
    deleteProduct(id) {
        console.log(`Eliminando producto con ID: ${id}`);
        
        // Convertir el ID a una cadena
        const idString = id.toString();
    
        // Buscar el producto por su ID en forma de cadena
        const index = this.products.findIndex(product => product.id.toString() === idString);
    
        if (index !== -1) {
            // Verificar si el ID del producto está presente en la lista
            const deletedProduct = this.products.splice(index, 1);
            console.log(`Producto con ID ${id} eliminado.`);
            this.saveProductsToFile(); // Guarda los productos actualizados en el archivo JSON
            return deletedProduct;
        } else {
            console.error(`Producto con ID ${id} no encontrado.`);
            return null;
        }
    }
    
}

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Ejemplo de uso
const manager = new ProductManager();

// Creamos 13 productos de ejemplo
// for (let i = 1; i <= 13; i++) {
//     const title = `Producto ${i}`;
//     const description = `Descripción del Producto ${i}`;
//     const price = Math.floor(Math.random() * 100) + 1; // Precio aleatorio entre 1 y 100
//     const stock = Math.floor(Math.random() * 1000) + 1; // Stock aleatorio entre 1 y 1000
//     const status = Math.random() < 0.5; // Generamos un estado aleatorio (true/false)
//     const thumbnaild = `imagen${i}.jpg`;
//     const code = generateRandomCode(); // Generamos un código aleatorio
//     const category = `Categoría ${Math.ceil(i / 4)}`; // Cada 4 productos tienen la misma categoría
//     manager.addProduct(title, description, price, stock, status, thumbnaild, code, category);
// }

module.exports = ProductManager;
