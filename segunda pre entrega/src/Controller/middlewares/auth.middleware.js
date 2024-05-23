const User = require('../../DAO/models/user.model');

module.exports = {
    userIsLogged: (req, res, next) => {
        // El usuario debe tener una sesión iniciada
        const isLoggedIn = ![null, undefined].includes(req.session.user);
        console.log('User is logged middleware:', isLoggedIn);
        if (!isLoggedIn) {
            return res.redirect('/error400');
        }
        next();
    },
    userNoIsLogged: (req, res, next) => {
        const isLoggedIn = ![null, undefined].includes(req.session.user);
        console.log('User is not logged middleware:', isLoggedIn);
        
        if (isLoggedIn) {
            return res.redirect('/profile');
        }
        next();
    },
    checkUserAlreadyRegistered: async (req, res, next) => {
        const { email } = req.body;
        console.log('Check if user already registered middleware');

    
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                req.session.user = existingUser;
                return res.redirect('/profile');
            }
            next();
        } catch (err) {
            console.error(err);
            res.status(500).send('Error en el servidor');
        }
    },
      // Nuevo middleware para verificar si el usuario es un administrador interno
    checkInternalAdmin: (req, res, next) => {
        const internalAdminEmail = 'admin@example.com'; // Correo electrónico del administrador interno
        const loggedInUser = req.session.user;

        if (loggedInUser && loggedInUser.email === internalAdminEmail) {
            req.isAdmin = true;
            // Si es un administrador interno, redirige a una vista especial
            res.redirect('/admin');
        }
        
        req.isAdmin = false;
        // Si no es un administrador interno, continúa con el siguiente middleware
        next();
    }
};
