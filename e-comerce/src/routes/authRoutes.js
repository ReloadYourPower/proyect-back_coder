const Router= require('express');
const router = Router();
;
const {loginPage,logoutUser} = require('../controllers/authController');
const { forwardAuthenticated } = require('../middlewares/authMiddleware');
// const  validateUserRegistration = require('../middlewares/validationMiddleware');


router.get('/login', forwardAuthenticated, loginPage);
// Ruta GET para la página de registro
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
router.get('/logout', logoutUser);

module.exports = router;
