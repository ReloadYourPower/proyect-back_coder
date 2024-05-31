const Router= require('express');
const router = Router();
const viewController = require('../controllers/viewController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', viewController.homePage);
router.get('/register', forwardAuthenticated, viewController.registerPage);
router.get('/login', forwardAuthenticated, viewController.loginPage);
router.get('/dashboard', ensureAuthenticated, viewController.dashboardPage);

module.exports = router;
