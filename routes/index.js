const router = require('express').Router();
const users = require('./api/users');
const posts = require('./api/posts');

router.get('/',(req,res)=>{
  res.render('login',{test:"templating is working"});
})

//test route used to test front end ajax
router.get('/test',(req,res)=>{
  // res.status(200).json({payload:'this text was sent from the server'});
  res.redirect('/hello');
});

router.get('/hello',(req,res)=>{
  res.send('render');
})

router.use('/users',users);
router.use('/posts',posts);



module.exports = router;