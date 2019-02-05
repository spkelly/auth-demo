var router = require('express').Router();
var authServices = require('../../services/authServices');


router.get('/login', authServices.loginUser);
router.get('/logout', authServices.logoutUser);

module.exports = router;