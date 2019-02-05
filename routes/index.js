const router = require('express').Router();
const users = require('./api/users');
const posts = require('./api/posts');

router.get('/',(req,res)=>{
  res.render('index',{test:"templating is working"});
})

router.use('/users',users);
router.use('./posts',posts);


module.exports = router;