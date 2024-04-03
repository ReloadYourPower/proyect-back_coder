const DataBaseManager = require('./DAO/monongoDB/dataBase');
const ProductManager = require('./productManager');

const manager = new ProductManager();
const mongo = new DataBaseManager();

function initializeSocket(httpServer) {
    const { Server } = require('socket.io');
    const socketServer = new Server(httpServer);

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
                await mongo.updateDocumentById(code, data);
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
                await mongo.deleteDocumentByCode(code);
                console.log(`Producto con ID ${code} eliminado correctamente.`);
            } catch (error) {
                console.error(`No se pudo eliminar el producto con ID ${code}:`, error);
            }
        });

        socket.on('message', data => {
            const messages = [];// Definir la variable messages como un array vacío
            console.log('Datos recibidos:', data);
            messages.push(data);
            console.log(messages); // Agregar el mensaje al array de mensajes
            socket.emit('message', data); // Enviar confirmación al cliente
            socket.emit('messageLogs', messages)
        });
    });
}

module.exports = {
    initializeSocket
};
