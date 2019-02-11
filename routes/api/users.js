var express = require('express');
var userServices = require('../../services/userServices');
var router = express.Router();
var auth = require('../../middleware').auth;
var queries = require('../../db/queries');

router.get('/',auth.checkToken, userServices.getAllUsers);
router.post('/', userServices.createUser);

router.post('/login',userServices.loginUser);
router.get('/logout',(req,res,next)=>{
  ('here')
  req.session.destroy();
  res.redirect('/');
});

router.get('/register',(req,res,next)=>{
  let hasError=req.query.err;
  let errorMessage = hasError? 'Username or password is incorrect': ''
  res.render('signup',{hasError,errorMessage});
})

router.get('/profile',auth.checkAuthentication, (req,res,next)=>{
  ('I am in the profile callback, my session data is: ',req.session)
  queries.getUserById(req.session.user.userId)
  .then((user)=>{
    ('logged in as: ', user);
    user = user[0]
    res.render('profile', {user});
  })
  .catch((err)=>{
    next(err);
  });
})

router.get('/:id',auth.checkToken, userServices.getUserById);
router.post('/:id',auth.checkToken, userServices.updateUser);
router.delete('/:id',(req,res,next)=>{res.send('deleting user')});




module.exports = router;