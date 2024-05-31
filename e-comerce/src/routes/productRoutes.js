const Router= require('express');
const router = Router();

const productController = require('../controllers/productController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/authMiddleware');

router.get('/', productController.getProducts);
router.post('/add', ensureAuthenticated, ensureAdmin, productController.addProduct);

module.exports = router;
