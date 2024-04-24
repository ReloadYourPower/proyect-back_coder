const { Router } = require('express')
const User = require('../models/user.model');
const {userIsLoged, userNoIsLoged} = require('../middlewares/auth.middleware') ;

const router = Router()

router.get('/', (req, res) => {
    const isLoggedIn = ![null, undefined].includes(req.session.user)

    res.render('index', {
        title: 'Home',
        isLoggedIn,
        isNotLoggedIn: !isLoggedIn,
    })
})

router.get('/login',userNoIsLoged, (_, res) => {
    // TODO: agregar middleware, sólo se puede acceder si no está logueado
    res.render('login', {
        title: 'Login'
    })
})

router.get('/register',userNoIsLoged, (_, res) => {
    // TODO: agregar middleware, sólo se puede acceder si no está logueado
    res.render('register', {
        title: 'Register'
    })
})

router.get('/profile',userIsLoged, async (req, res) => {
    // TODO: agregar middleware, sólo se puede acceder si está logueado
    const idFromSession = req.session.user._id;
    const user = await User.findOne({_id: idFromSession})
    // TODO: mostrar los datos del usuario actualmente loggeado, en vez de los fake
    res.render('profile', {
        title: 'My profile',
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            email: user.email
        }
    })
})

module.exports = router