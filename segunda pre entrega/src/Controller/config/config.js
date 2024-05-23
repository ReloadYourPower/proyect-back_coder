const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { dbName, mongoUrl } = require('../../DAO/dbConfig')

const loadProducts = async () => {
  const uri = mongoUrl; // URI de conexión a MongoDB
  const dtbName = dbName; // Nombre de tu base de datos
  const collectionName = 'products'; // Nombre de la colección

  const filePath = path.join(__dirname, './product.json'); // Ruta al archivo JSON
  const data = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(data); // Parsear el archivo JSON

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db(dtbName);
    const collection = db.collection(collectionName);

    await collection.insertMany(products); // Insertar productos en la colección
    console.log('Productos cargados correctamente');
  } catch (error) {
    console.error('Error al cargar productos:', error);
  } finally {
    await client.close();
  }
};

module.exports = loadProducts;