const Router= require('express');
const router = Router();
const {registerPage,loginPage,dashboardPage,profile} = require('../controllers/viewController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/authMiddleware');
const {registerUser} = require('../controllers/authController');
const passport = require('passport')

router.get('/',loginPage);
router.get('/register', forwardAuthenticated, registerPage);
router.get('/login', forwardAuthenticated, loginPage);
// Ruta POST para el registro de usuarios
router.post('/register', forwardAuthenticated,registerUser);
router.post('/login',  (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next)});

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/images/avatar.jpg',
      bio: 'Desarrollador de software con experiencia en Node.js y Express.',
      location: 'San Francisco, CA'
  };
  res.render('profile', { title: 'Perfil de Usuario', user, isAuthenticated: req.isAuthenticated() });
    // profile()
  } else {
    res.redirect('/login');
  }
});
router.get('/dashboard', ensureAuthenticated, dashboardPage);
router.get('/error401', ensureAuthenticated, );
module.exports = router;
