const Router= require('express');
const router = Router();

const {viewCart,addToCart} = require('../controllers/cartControllers');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, viewCart);
router.post('/add/:productId', ensureAuthenticated, addToCart);

module.exports = router;
