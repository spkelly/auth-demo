var express = require('express');

var router = express.Router();


function getAllUsers(req,res,next){};
function getUserById(req,res,next){};
function updateUser(req,res,next){};

router.get('/', getAllUsers);
router.get('/#id', getUserById);
router.post('/#id', updateUser);


module.exports = router;