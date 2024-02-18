class ProductManager {
    constructor() {
        // Inicializa el ID del próximo producto en 1
        this.nextId = 1;
        // Inicializa el array de productos vacío
        this.products = [];
    }

    // Método para agregar un producto al inventario
    addProduct(title, description, price, stock, thumbnaild, code) {
        // Genera un nuevo ID para el producto y luego incrementa el contador de ID
        const id = this.nextId++;
        // Crea un nuevo objeto producto con los parámetros dados
        const newProduct = {
            id,
            title,
            description,
            price,
            stock,
            thumbnaild,
            code
        };

        // Comprueba si el código del producto ya existe en otro producto
        if (this.codeExist(code)) {
            // Imprime un mensaje de advertencia si el código ya existe
            console.log(`El código ${code} ya existe en otro producto.`);
        } else {
            // Agrega el nuevo producto al array de productos si el código no existe
            this.products.push(newProduct);
            // Imprime un mensaje de confirmación de que el producto se agregó
            console.log(`Producto ${title} agregado al inventario con ID ${id}.`);
        }
    }

    // Método para verificar si un código de producto ya existe en otro producto
    codeExist(code) {
        // Utiliza el método some() para verificar si algún producto tiene el mismo código
        return this.products.some(product => product.code === code);
    }

    // Método para obtener todos los productos del inventario
    getProducts() {
        // Devuelve el array de productos
        return this.products;
    }

    // Método para obtener un producto por su ID
    getProductById(id) {
        // Busca el producto con el ID dado en el array de productos
        const product = this.products.find(product => product.id === id);
        // Si se encuentra el producto, imprime los datos del producto y lo devuelve
        if (product) {
            console.log(`Datos del producto con ID: ${product.id}`);
            return product;
        } else {
            // Si el producto no se encuentra, imprime un mensaje de error y devuelve null
            console.error(`Producto con ID ${id} no encontrado.`);
            return null;
        }
    }
}

// Ejemplo de uso
const manager = new ProductManager();
// Agrega algunos productos al inventario
manager.addProduct('Título', 'Descripción', 10, 100, 'imagen.jpg', 'ABC123');
manager.addProduct('Título1', 'Descripción1', 10, 100, 'imagen1.jpg', 'ABC1243');
manager.addProduct('Título2', 'Descripción1¡', 10, 100, 'imagen2.jpg', 'AB4C123');

// Muestra todos los productos del inventario
console.log("Todos los productos:");
console.log(manager.getProducts());

// Muestra los detalles de un producto específico por su ID
console.log(manager.getProductById(2));

// Intenta buscar un producto con un ID que no existe
console.log(manager.getProductById(3));
