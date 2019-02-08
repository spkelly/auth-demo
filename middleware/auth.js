let jwt = require('jsonwebtoken');


function checkToken(req,res,next){
  let userJWT = req.headers.authorization;

  if(userJWT.startsWith('Bearer ')){
    userJWT = userJWT.slice(7,userJWT.length)
  }

  jwt.verify(userJWT,process.env.JWT_SECRET,(err,userInfo)=>{
    if(err){
      res.send('error, invalid token');
    }
    else{
      req.userInfo = userInfo;
      next();
    }
  });
}

function signToken(req,res,next){
  let sessionData = {userId:'id',username:'name',accountType:'admin'}
  req.token = jwt.sign({data:sessionData},process.env.JWT_SECRET,{expiresIn:240, algorithm:'HS256'});
  next();
}




module.exports = {
  checkToken
}
