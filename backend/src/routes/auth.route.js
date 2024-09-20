const router = require('express').Router();
const {registerUser, loginUser, logoutUser} = require('../controllers/user.controller');
const { registerValidation, loginValidation } = require('../middlewares/authValidation.middleware');

router.route("/register").post(registerValidation, registerUser)

router.route("/login").post(loginValidation, loginUser)

router.post('/logout', logoutUser)

module.exports = router;
