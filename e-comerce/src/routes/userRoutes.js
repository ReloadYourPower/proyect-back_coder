const Router= require('express');
const router = Router();

const {getUsers,getUserById,updateUser,deleteUser,getCurrentUser,changeUserRole} = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { ensureAdmin } = require('../middlewares/roleMiddleware');
const {roleMiddleware} = require('../controllers/authController');


router.post('/', ensureAdmin, getUsers);
router.post('/current',  ensureAdmin, getCurrentUser);
router.post('/premium', ensureAuthenticated, ensureAdmin, roleMiddleware, getCurrentUser);
// router.get('/current', ensureAuthenticated, ensureAdmin);
router.put('/premium/:uid', ensureAuthenticated, ensureAdmin, roleMiddleware, changeUserRole);
router.patch('/premium/:uid', ensureAuthenticated, ensureAdmin, changeUserRole);
router.get('/', ensureAuthenticated, ensureAdmin, getUsers);
router.get('/:id', ensureAuthenticated, ensureAdmin, getUserById);
router.post('/update/:id', ensureAuthenticated, ensureAdmin,updateUser);
router.post('/delete/:id', ensureAuthenticated, ensureAdmin,deleteUser);

module.exports = router;
