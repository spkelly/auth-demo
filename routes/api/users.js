var express = require('express');
var userServices = require('../../services/userServices');
var router = express.Router();


router.get('/', userServices.getAllUsers);
router.get('/:id', userServices.getUserById);
router.post('/:id', userServices.updateUser);


module.exports = router;