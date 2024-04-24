const DatabaseManager = require('./dataBase');



// Crear una instancia de DatabaseManager
const dbManager = new DatabaseManager();

// Conectar a la base de datos
(async () => {
    await dbManager.connect();

    try {
        // Realizar una consulta paginada para obtener productos
        const products = await dbManager.getProducts({ limit: 10, page: 1, order: 'title' });

        // Mostrar los productos encontrados
        console.log("Productos encontrados:", products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }

    // Desconectar de la base de datos
    await dbManager.disconnect();
})();