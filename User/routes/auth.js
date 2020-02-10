const express = require('express');
const { signup, signin, signout, forgotPassword, resetPassword } = require('../controllers/auth');
const { userSignupValidator, passwordResetValidator } = require("../validator");

// const validator = require('../validators');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post("/signin", signin);
//signout
router.get('/signout', signout);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

module.exports = router;