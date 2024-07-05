const Router = require('express');
const router = Router();



const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const mockingRoutes = require('./routes/mockingRoutes');
const email =require('./routes/emailRoutes')


router.use('/',require('./routes/viewRoutes'));
router.use('/profile',require('./routes/viewRoutes'));
router.use('/profile/dashboard',require('./routes/viewRoutes'));
router.use('/profile/products',productRoutes);
router.use('/auth', require('./routes/authRoutes'));
router.use('/profile/cart',require('./routes/cartRoutes'));
router.use('/profile/users', userRoutes, (req,res)=>{res.send('prueba de ruta de usuarios iniciada')});
router.use('/products/mocking', mockingRoutes);
router.use('/profile/email', email, (req,res)=>{res.send('prueba de email iniciada')});

module.exports = router;

