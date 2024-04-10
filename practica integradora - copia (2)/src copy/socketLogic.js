const DataBaseManager = require('./DAO/monongoDB/dataBase');
const ProductManager = require('./productManager');

const manager = new ProductManager();
const mongo = new DataBaseManager();
// const users = {}; // Objeto para almacenar usuarios por id de socket     

function initializeSocket(httpServer) {
    const { Server } = require('socket.io');
    const socketServer = new Server(httpServer);
    const userMessages = {}; // Objeto para almacenar usuarios y mensajes de cada usuario por separado

    
    socketServer.on('connection', socket => {
        console.log('Nuevo cliente conectado');

        socket.on('addProduct', async data => {
            console.log('Datos recibidos para agregar un producto:', data);
            const { title, description, price, stock, status, thumbnail, code, category } = data;
            try {
                 manager.addProduct(title, description, price, stock, status, thumbnail, code, category);
                console.log('Producto agregado correctamente.');
                await mongo.createDocument(data);
            } catch (error) {
                console.error('Error al agregar el producto:', error);
            }
        });

        socket.on('update', async (id,code, data) => {
            console.log('Datos recibidos para actualizar un producto:', id,code, data);
            try {
                 manager.updateProduct(id, data);
                await mongo.updateProduct(code, data);
                console.log(`Producto con ID ${id} actualizado correctamente.`);
            } catch (error) {
                console.error(`No se pudo actualizar el producto con ID ${id}:`, error);
            }
        });

        socket.on('view', async (id,code) => {
            console.log(`ID recibido para buscar un producto: ${id}, Code recibido para buscar un producto: ${code}`);
            try {
                const product = await manager.getProductById(id);
                console.log(`Producto encontrado: ${JSON.stringify(product)}`);
            } catch (error) {
                console.error(`No se pudo encontrar el producto con ID ${id}:`, error);
            }
            try {
                const product = await mongo.findProductByCode(code);
                console.log(`Producto encontrado en MongoDB: ${JSON.stringify(product)}`);
            } catch (error) {
                console.error(`No se pudo encontrar el producto con code ${code} en MongoDB:`, error);
            }
        });

        socket.on('delete', async (id,code) => {
            console.log(`ID recibido para eliminar un producto: ${id},Code recibido para eliminar un producto: ${code}`);
            try {
                 manager.deleteProduct(id);
                await mongo.deleteProductByCode(code);
                console.log(`Producto con ID ${code} eliminado correctamente.`);
            } catch (error) {
                console.error(`No se pudo eliminar el producto con ID ${code}:`, error);
            }
        });

// Evento para manejar el nombre de usuario
socket.on('username', userName => {
    // Asignar el nombre de usuario actual
    currentUserName = userName;

    // Verificar si el usuario ya existe en el objeto de mensajes
    if (!userMessages[currentUserName]) {
        // Inicializar su entrada en el objeto de mensajes
        userMessages[currentUserName] = { username: currentUserName, messages: [] };
    }
});

// Evento para manejar los mensajes
socket.on('message', message => {
    // Verificar si hay un nombre de usuario actual
    if (currentUserName) {
        // Agregar el mensaje al array de mensajes del usuario correspondiente
        userMessages[currentUserName].messages.push(message);

        // Emitir los logs de mensajes actualizados al cliente
        socket.emit('messageLogs', userMessages[currentUserName]);
    }
});

    
   
   

    
    
});
   
}

module.exports = {
    initializeSocket
};
