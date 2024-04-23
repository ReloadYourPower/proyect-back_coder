const DatabaseManager = require('../../DAO/monongoDB/dataBase');

// Crear una instancia de DatabaseManager
const dbManager = new DatabaseManager();

// Conectar a la base de datos
async function Product (data) {
    await dbManager.connect();

    try {
        const { limit = 0, page = 1, order = 'title', query = {} } = data || {};
        const limitNum = parseInt(limit);
        const pageNum =parseInt(page);
       if (limitNum > 0) {
        if (query) {
            const { products, totalCount, totalPages, currentPage, query } =  await dbManager.getProducts(limit, pageNum, order, query);

        // Mostrar los productos encontrados
        console.log("Productos encontrados:", products , totalCount, totalPages, currentPage);
       
            
        } else {
            const { products, totalCount, totalPages, currentPage } =  await dbManager.getProducts(limit, pageNum, order);
            let query = { category: "todos" };
        // Mostrar los productos encontrados
        console.log("Productos encontrados:", products , totalCount, totalPages, currentPage);
       
            
        }
         return {
            products,
            totalCount,
            totalPages,
            currentPage,
            query}; // Devolver el array de productos
        
       }
       else{

        const products = await dbManager.readAllDocuments();
        console.log( 'productos desde products', products);
        console.log( 'productos desde products', products.length);
       // Devolver todos los productos disponibles
        return {
             products: products,
            totalCount: products.length,
            totalPages: 1,
            currentPage: 1,
            query
        }; // Devolver el array de productos
       }
     
    } catch (error) {
        console.warn("Error al obtener productos:", error);
        
    }

    
}

module.exports = Product;