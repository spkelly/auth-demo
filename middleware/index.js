
const requestLogger = function(req,res,next){
  console.log('**SERVER*** new [',req.method,'] request from ' + req.ip);
  next();
}


module.exports = {
  requestLogger
}