const router = require('express').Router();
const users = require('./api/users');
const posts = require('./api/posts');

router.get('/',(req,res)=>{
  let hasError=req.query.err;
  let errorMessage = hasError? 'Username or Password is incorrect': ''
  if(req.session.isAuthenticated && req.session.cookie){
    res.redirect('/users/profile')
  }
  else{
    res.render('login',{hasError,errorMessage});
  }
})

//test route used to test front end ajax
router.get('/test',(req,res)=>{
  // res.status(200).json({payload:'this text was sent from the server'});
  res.redirect('/hello');
});

router.get('/hello',(req,res)=>{
  res.render('index');
})

router.use('/users',users);
router.use('/posts',posts);



module.exports = router;