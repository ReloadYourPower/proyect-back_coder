const DatabaseManager = require('../../DAO/monongoDB/dataBase');

// Crear una instancia de DatabaseManager
const dbManager = new DatabaseManager();

// Conectar a la base de datos
const Product = async (data) => {
    await dbManager.connect();

    try {
        const { limit, page, order } = data;
       if (limit > 0) {
        const { products, totalCount, totalPages, currentPage } =  await dbManager.getProducts( limit, page, order);

        // Mostrar los productos encontrados
        console.log("Productos encontrados:", products , totalCount, totalPages, currentPage);
        return {
            products,
            totalCount,
            totalPages,
            currentPage}; // Devolver el array de productos
        
       }
       else{

        const products = await dbManager.readAllDocuments();
        console.log( 'productos desde products', products);
       // Devolver todos los productos disponibles
        return {
             products: products,
            totalCount: products.length,
            totalPages: 1,
            currentPage: 1
        }; // Devolver el array de productos
       }
       

    } catch (error) {
        console.warn("Error al obtener productos:", error);
        
    }

    
}

module.exports = Product;
