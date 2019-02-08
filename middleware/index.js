let auth = require('./auth');


const requestLogger = function(req,res,next){
  console.log('**SERVER*** new [',req.method,'] request from ' + req.ip);
  console.log('headers', req.headers);
  next();
}


module.exports = {
  requestLogger,
  auth
}