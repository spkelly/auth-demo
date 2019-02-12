var express = require('express');
var userServices = require('../../services/userServices');
var router = express.Router();
var auth = require('../../middleware').auth;
var queries = require('../../db/queries');

router.get('/', auth.checkAuthentication,userServices.getAllUsers);
router.post('/', userServices.createUser);

router.post('/login',userServices.loginUser);
router.get('/logout',(req,res,next)=>{

  req.session.destroy();
  res.redirect('/');
});

router.get('/register',(req,res,next)=>{
  let hasError=req.query.err;
  let errorMessage = hasError? 'A user with this email already exists': ''
  res.render('signup',{hasError,errorMessage});
})

router.get('/profile',auth.checkAuthentication, (req,res,next)=>{

  queries.getUserById(req.session.user.userId)
  .then((user)=>{

    user = user[0]
    res.render('profile', {user});
  })
  .catch((err)=>{
    next(err);
  });
})

router.get('/:id', userServices.getUserById);
router.post('/:id', userServices.updateUser);
router.delete('/:id',(req,res,next)=>{res.send('deleting user')});


('blach');


module.exports = router;