const router = require('express').Router();
const users = require('./api/users');
const posts = require('./api/posts');

router.get('/',(req,res)=>{
  if(req.session.isAuthenticated && req.session.cookie){
    res.redirect('/users/profile')
  }
  else{
    res.render('login',{err:req.session.err?req.session.err:''});
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