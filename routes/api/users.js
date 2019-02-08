var express = require('express');
var userServices = require('../../services/userServices');
var router = express.Router();
var auth = require('../../middleware').auth;

router.get('/',auth.checkToken, userServices.getAllUsers);
router.post('/', userServices.createUser);

router.get('/login',userServices.loginUser);
router.get('/logout',userServices.logoutUser);

router.get('/register',(req,res,next)=>{
  res.render('signup');
})

// router.get('/me',auth.checkToken,userServices.getLoggedInUser);
// router.post('/me',auth.checkToken,userServices.updateLoggedInUser);
// router.delete('/me',auth.checkToken,userServices.deleteLoggedInUser);

router.get('/:id',auth.checkToken, userServices.getUserById);
router.post('/:id',auth.checkToken, userServices.updateUser);
router.delete('/:id',(req,res,next)=>{res.send('deleting user')});


module.exports = router;