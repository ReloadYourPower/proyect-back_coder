const { Router } = require('express')
const User = require('../models/user.model')
const { userNoIsLogged, checkUserAlreadyRegistered} = require('../../Controller/middlewares/auth.middleware') ;


const router = Router()

router.post('/login', async (req, res) => {
    console.log(req.body)
    // TODO: implementar!
    // 1. verificar que el usuario exista en la BD
    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({error: 'invalid credentialts'})
        
    }

    const user = await User.findOne({email, password})

    if (!user) {
        return res.status(400).json({error: 'invalid user'})
        
    }

    
    // 2. crear nueva sesión si el usuario existe
    req.session.user = { email,_id:user._id.toString()}
    res.redirect('/')
})

router.post('/register',userNoIsLogged, checkUserAlreadyRegistered, async (req, res) => {
    console.log(req.body)
    // TODO: implementar!
    // 1. crear usuario nuevo
    try {
        const {firstName,lastName,age,email,password} = req.body;
       const user = await User.create({
            firstName
            ,lastName
            ,age:+age
            ,email,
            password});

            req.session.user = { email,_id:user._id.toString()}
            res.redirect('/')

    } catch (error) {
        return res.status(500)
        
    }
    
})

module.exports = router