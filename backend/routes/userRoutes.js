const express = require('express');
const {registerUser,loginUser, logOut, forgotPassword, resetPassword, getUserDetails, updatePassword} = require('../controllers/userController')
const router = express.Router();
const {isAuthenticatedUser} = require('../middleware/auth');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',isAuthenticatedUser,getUserDetails);
router.post('/password/forgot',forgotPassword);
router.post('/password/reset/:token',resetPassword);
router.get('/logout',logOut);
router.put('/password/update',isAuthenticatedUser,updatePassword);
module.exports = router;