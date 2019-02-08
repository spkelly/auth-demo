const router = require('express').Router();
const users = require('./api/users');
const posts = require('./api/posts');

router.get('/',(req,res)=>{
  console.log(req.session);
  if(req.session.views){
    req.session.views ++
  }
  else{
    req.session.views = 1
  }
  res.render('login',{test:"templating is working"});
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