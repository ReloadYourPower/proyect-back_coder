const Router= require('express');
const router = Router();

const {getUsers,getUserById,updateUser,deleteUser} = require('../controllers/userController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, ensureAdmin, getUsers);
router.get('/:id', ensureAuthenticated, ensureAdmin, getUserById);
router.post('/update/:id', ensureAuthenticated, ensureAdmin,updateUser);
router.post('/delete/:id', ensureAuthenticated, ensureAdmin,deleteUser);

module.exports = router;
