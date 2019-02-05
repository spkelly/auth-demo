var router = require('express').Router();

function loginUser(req,res,next){}
function logoutUser(req,res,next){}

router.get('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;