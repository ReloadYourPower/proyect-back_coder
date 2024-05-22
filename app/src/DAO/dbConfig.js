
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();
module.exports = {
    dbName: 'Admin-coder',
    mongoUrl: process.env.MONGO_URL,
}