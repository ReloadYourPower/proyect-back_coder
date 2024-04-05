const { MongoClient, ObjectID } = require('mongodb');

// URI de conexión a tu base de datos MongoDB
const uri = "mongodb+srv://reloadyoupower:80mSmV56CAe6cYwl@cluster0.vrb7xui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const databaseName ='productsManager'; 
const collectionName= 'products';
// Clase que encapsula las operaciones de la base de datos
class DatabaseManager {
    constructor() {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Conexión exitosa a la base de datos.");
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
        }
    }

    async disconnect() {
        try {
            await this.client.close();
            console.log("Desconexión exitosa de la base de datos.");
        } catch (error) {
            console.error("Error al desconectar de la base de datos:", error);
        }
    }

    async readAllDocuments() {
        try {
            const database = this.client.db(databaseName);
            const collection = database.collection(collectionName);
            const documents = await collection.find({}).toArray();
            return documents;
        } catch (error) {
            console.error("Error al leer todos los documentos:", error);
            throw error;
        }
    }


    async createDocument(data) {
        try {
            const database = this.client.db(databaseName);
            const collection = database.collection(collectionName);
            await collection.insertOne(data);
            console.log("Documento creado exitosamente.");
        } catch (error) {
            console.error("Error al crear el documento:", error);
        }
    }

async findProductByCode(productCode) {
    try {

        // Obtener la referencia de la base de datos y la colección
        const database = this.client.db(databaseName);
        const collection = database.collection(collectionName);

        // Buscar el producto por su código
        const product = await collection.findOne({ code: productCode });

        return product;
    } catch (error) {
        console.error("Error al buscar el producto por código:", error);
        throw error;
    } 
}

// Función para leer un producto por su código
async  readProductByCode(productCode) {
    try {

        // Obtener la referencia de la base de datos y la colección
        const database = this.client.db(databaseName);
        const collection = database.collection(collectionName);

        // Leer el producto por su código
        const product = await collection.findOne({ code: productCode });

        return product;
    } catch (error) {
        console.error("Error al leer el producto por código:", error);
        throw error;
    } 
}

// Función para actualizar un producto por su código
async updateProduct(productCode, newData) {
    try {
    

        // Obtener la referencia de la base de datos y la colección
        const database = this.client.db(databaseName);
        const collection = database.collection(collectionName);

        // Actualizar el producto por su código
        await collection.updateOne({ code: productCode }, { $set: newData });

        console.log(`Producto con código ${productCode} actualizado correctamente.`);
    } catch (error) {
        console.error("Error al actualizar el producto por código:", error);
        throw error;
    }
}

// Función para eliminar un producto por su código
async deleteProductByCode(productCode) {
    try {
       

        // Obtener la referencia de la base de datos y la colección
        const database = this.client.db(databaseName);
        const collection = database.collection(collectionName);

        // Eliminar el producto por su código
        await collection.deleteOne({ code: productCode });

        console.log(`Producto con código ${productCode} eliminado correctamente.`);
    } catch (error) {
        console.error("Error al eliminar el producto por código:", error);
        throw error;
    }

}

};

// Exportar una instancia de DatabaseManager para su uso en otros módulos
module.exports = DatabaseManager;


  // async readDocumentById(id) {
    //     try {
    //         const database = this.client.db(databaseName);
    //         const collection = database.collection(collectionName);
    //         const document = await collection.findOne({ id: id });
    //         console.log("Documento encontrado:");
    //         console.log(document);
    //     } catch (error) {
    //         console.error("Error al leer el documento por ID:", error);
    //     }
    // }
    // Función para buscar un producto por su ID personalizado
// async findProductByCustomId(databaseName, collectionName, customId) {
//     try {
//         // Conectar al cliente de MongoDB
//         await client.connect();

//         // Obtener la referencia de la base de datos y la colección
//         const database = client.db(databaseName);
//         const collection = database.collection(collectionName);

//         // Buscar el producto por su ID personalizado
//         const product = await collection.findOne({ id: customId });

//         return product;
//     } catch (error) {
//         console.error("Error al buscar el producto por ID personalizado:", error);
//         throw error;
//     } finally {
//         // Cerrar la conexión al finalizar
//         await client.close();
//     }
// }

// Función para buscar un producto por su código
// Función para buscar un producto por su código
  // async updateDocumentById(id, newData) {
    //     try {
    //         const database = this.client.db(databaseName);
    //         const collection = database.collection(collectionName);
    //         await collection.updateOne({ id: id }, { $set: newData });
    //         console.log("Documento actualizado exitosamente.");
    //     } catch (error) {
    //         console.error("Error al actualizar el documento por ID:", error);
    //     }
    // }

    // async deleteDocumentById(id) {
    //     try {
    //         const database = this.client.db(databaseName);
    //         const collection = database.collection(collectionName);
    //         await collection.deleteOne({ id: id });
    //         console.log("Documento eliminado exitosamente.");
    //     } catch (error) {
    //         console.error("Error al eliminar el documento por ID:", error);
    //     }
    // }