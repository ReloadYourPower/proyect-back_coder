// controllers/AuthController.js

const jwt = require('jsonwebtoken');
const User = require('../models/admin.model');

// Función para simular la generación de un token JWT
function generateToken(user) {
    // Aquí deberías utilizar tu código real para generar un token utilizando la información del usuario
    const secretKey = process.env.JWT_SECRET; // Se supone que esto está definido en tu archivo .env
    const token = jwt.sign({ username: user.username, isAdmin: user.isAdmin }, secretKey);
    return token;
}

// Función de inicio de sesión
async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Simulamos la generación de un token JWT
        const token = generateToken(user);

        // Enviar el token como respuesta
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    login
};
