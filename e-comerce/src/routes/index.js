const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const cartRoutes = require('./cartRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const mockingRoutes = require('./mockingRoutes');

router.use('/auth', authRoutes);
router.use('/carts', cartRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/', mockingRoutes);

module.exports = router;
