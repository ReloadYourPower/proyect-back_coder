const { Router } = require('express')
const User = require('../models/user.model');
const Product = require('../models/user.model');
const {userIsLogged, userNoIsLogged,checkInternalAdmin} = require('../../Controller/middlewares/auth.middleware') ;
const { addProduct, getProducts } = require('../../Controller/middlewares/product.controller');

const router = Router()
// Ruta para manejar la primera visita
router.get('/', (req, res) => {
    const isLoggedIn = ![null, undefined].includes(req.session.user);

    if (!req.session.counter) {
        // Si es la primera visita, inicializa el contador
        req.session.counter = 1;
        console.log(`Esta es su primera visita.`);
    }

    res.render('index', {
        title: 'Home',
        isLoggedIn,
        isNotLoggedIn: !isLoggedIn,
        isFirstVisit: !req.session.counter, // Agrega una bandera para indicar la primera visita
        counter: req.session.counter
    });
});

// Ruta para manejar las visitas posteriores



router.get('/login',userNoIsLogged, (_, res) => {
    // TODO: agregar middleware, sólo se puede acceder si no está logueado
    res.render('login', {
        title: 'Login'
    })
})

router.get('/register',userNoIsLogged, (_, res) => {
    // TODO: agregar middleware, sólo se puede acceder si no está logeado
    res.render('register', {
        title: 'Register'
    })
})

// router.get('/profile',userIsLogged, async (req, res) => {
//     // TODO: agregar middleware, sólo se puede acceder si está logueado
//     const idFromSession = req.session.user._id;
//     const user = await User.findOne({_id: idFromSession})
//     // TODO: mostrar los datos del usuario actualmente loggeado, en vez de los fake
//     res.render('profile', {
//         title: 'My profile'
//     })
// })
// Agregar un producto desde el perfil del usuario

// Ver el perfil del usuario logueado
router.get('/profile', userIsLogged,checkInternalAdmin, getProducts, async (req, res) => {
    try {
        const idFromSession = req.session.user._id;
        const user = await User.findOne({ _id: idFromSession });

        res.render('profile', {
            title: 'My profile',
            user: user
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get('/admin', userIsLogged, async (req, res) => {
    try {
        const idFromSession = req.session.user._id;
        const user = await User.findOne({ _id: idFromSession });
        const adminDetails = {
            name: 'Admin',
            // age: 30,  // La propiedad 'age' está ausente
            // Otros detalles del administrador...
        };

        // Aquí obtienes los detalles del administrador desde la base de datos


        res.render('admin', {
            title: 'admin',
            adminDetails: adminDetails// Pasa los detalles del administrador a la vista
            
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post('/profile', userIsLogged, addProduct);

// Obtener productos con paginación y filtrado


router.get('/visit', (req, res) => {
    const isLoggedIn = ![null, undefined].includes(req.session.user);

    if (req.session.counter) {
        req.session.counter++;
        console.log(`Esta es su visita nro. ${req.session.counter}`);
    } else {
        // Si se accede directamente a /visit sin haber visitado la página principal primero,
        // redirecciona a la página principal
        return res.redirect('/');
    }

    res.render('index', {
        title: 'visit',
        isLoggedIn,
        isNotLoggedIn: !isLoggedIn,
        isFirstVisit: false, // No es la primera visita
        counter: req.session.counter
    });
});
// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    // Verifica si el usuario está autenticado
    if (req.session.user) {
        // Elimina la sesión del usuario
        req.session.destroy(err => {
            if (err) {
                // Maneja cualquier error que ocurra al cerrar sesión
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Error al cerrar sesión');
            }
            // Redirige al usuario a la página de inicio de sesión o a donde desees
            res.redirect('/');
        });
    } else {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión o a donde desees
        res.redirect('/');
    }
});


module.exports = router