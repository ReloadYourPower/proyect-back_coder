//Defino la clase productManager y los metodos que esta clase puede utilizar addProducts, getProducts,  getProductsById
class productManager {
    // Constructor de la clase productManager
    constructor (title, description, price, stock, thumbnaild, code){
        // Inicialización de las propiedades del producto
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.thumbnaild = thumbnaild;
        this.code = code;
        this.nextId = 1; // Inicializamos el contador de IDs en 1
        // Inicialización del array de productos
        this.products = [];
    }

    // Método para agregar un producto al inventario
    addProduct() {
        const { title, description, price, stock, thumbnaild, code } = this;
        
        // Creamos un nuevo ID único para el producto
        const id = this.nextId++;
        
        const newProduct = {
            id, // Asignamos el ID al nuevo producto
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
        }
    }

    codeExist(code) {
        return this.products.some(product => product.code === code);
    }


    // Método para obtener todos los productos del inventario
    getProducts() {
        return this.products;
    }

    // Método para obtener un producto por su código
    getProductsById(id) {
        // Utiliza el método find() para buscar un producto con el código dado
       if (id) {
        return this.products.find(product => product.code === id);
       }
       else{
        console.log("this ID not found");
       } 
    }
}

// Ejemplo de uso
// Crear una instancia de la clase productManager con parámetros de ejemplo
const manager = new productManager('Título', 'Descripción', 10, 100, 'imagen.jpg', 'ABC123');
// Agregar un producto al inventario llamando al método addProduct()
manager.addProduct();

// Crear otra instancia de la clase productManager con parámetros de ejemplo
const manager1 = new productManager('Título1', 'Descripción1', 10, 100, 'imagen1.jpg', 'ABC123');
// Agregar otro producto al inventario llamando al método addProduct() de manager1
manager1.addProduct();

// Imprimir todos los productos del inventario llamando al método getProducts()
console.log(manager.getProducts());

// Obtener todos los productos del inventario llamando al método getProducts()
console.log("Todos los productos:");
console.log(manager.getProducts());
console.log(manager1.getProducts());

// Obtener un producto por su código llamando al método getProductsById()
console.log("Producto con código 'ABC123':");
console.log(manager.getProductsById('ABC123'));

// Intentar obtener un producto con un código que no existe
console.log("Producto con código '123456' (no existe):");
console.log(manager.getProductsById('123456'));

