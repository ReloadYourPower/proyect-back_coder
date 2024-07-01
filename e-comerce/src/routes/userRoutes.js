const Router= require('express');
const router = Router();

const {getUsers,getUserById,updateUser,deleteUser} = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { ensureAdmin } = require('../middlewares/roleMiddleware');
const {changeUserRole} = require('../controllers/userController');
const {getCurrentUser} = require('../controllers/userController');
const {roleMiddleware} = require('../controllers/authController');

router.get('/current', ensureAuthenticated, ensureAdmin, getCurrentUser);
router.put('/premium/:uid', ensureAuthenticated, ensureAdmin, roleMiddleware, changeUserRole);
router.patch('/premium/:uid', changeUserRole);
router.get('/', ensureAuthenticated, ensureAdmin, getUsers);
router.get('/:id', ensureAuthenticated, ensureAdmin, getUserById);
router.post('/update/:id', ensureAuthenticated, ensureAdmin,updateUser);
router.post('/delete/:id', ensureAuthenticated, ensureAdmin,deleteUser);

module.exports = router;
