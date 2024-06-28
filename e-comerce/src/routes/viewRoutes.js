const Router= require('express');
const router = Router();
const viewController = require('../controllers/viewController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/authMiddleware');
// const  validateUserRegistration = require('../middlewares/validationMiddleware');
const {registerUser} = require('../controllers/authController');
const passport = require('passport')

router.get('/', viewController.homePage);
router.get('/register', forwardAuthenticated, viewController.registerPage);
router.get('/login', forwardAuthenticated, viewController.loginPage);
// Ruta POST para el registro de usuarios
// router.post('/register', forwardAuthenticated,validateUserRegistration,registerUser);
router.post('/register',  registerUser);
  router.post('/login',forwardAuthenticated,  (req, res, next) => {
    console.log('Datos de login recibidos:', req.body);
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next)});
  
// router.get('/profile', ensureAuthenticated, viewController.dashboardPage);

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('profile');
  } else {
    res.redirect('/login');
  }
});
router.get('/error401', ensureAuthenticated, viewController.dashboardPage);
module.exports = router;
