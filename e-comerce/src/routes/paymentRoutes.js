const Router = require('express');
const router = Router();
const paymentController = require('../controllers/paymentController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, paymentController.viewPayments);
router.post('/process', ensureAuthenticated, paymentController.processPayment);

module.exports = router;
