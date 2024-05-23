const MongoStore = require('connect-mongo');
const session = require('express-session');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Verificar que la variable de entorno MONGO_URL está definida
if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not defined in the environment variables');
}

// Crear el almacenamiento de sesión con connect-mongo
const storage = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60 * 60 * 24, // Tiempo de vida de la sesión en segundos (opcional)
    autoRemove: 'interval', // Eliminación automática de sesiones expiradas (opcional)
    autoRemoveInterval: 60 * 24 // Intervalo de eliminación automática en minutos (opcional)
});

// Configurar y exportar el middleware de sesión
module.exports = session({
    store: storage,
    secret: process.env.SECRET_KEY || 'default_secret_key', // Utiliza una clave secreta predeterminada si no se proporciona en las variables de entorno
    resave: false, // No guarde la sesión si no se ha modificado
    saveUninitialized: false // No guarde la sesión si no se ha inicializado
});
