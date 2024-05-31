const Router= require('express');
const router = Router();
;
const {loginPage,loginUser,registerUser,logoutUser,registerPage} = require('../controllers/authController');
const { forwardAuthenticated } = require('../middlewares/authMiddleware');
const { validateUserRegistration } = require('../middlewares/validationMiddleware');

router.get('/login', forwardAuthenticated, loginPage);
router.post('/login', forwardAuthenticated, loginUser);
router.get('/register', forwardAuthenticated, registerPage);
router.post('/register', forwardAuthenticated, validateUserRegistration, registerUser);
router.get('/logout', logoutUser);

module.exports = router;
