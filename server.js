const path = require("path");
const express = require('express');
const routes = require('./routes');
const requestLogger = require('./middleware').requestLogger;
const bodyParser = require('body-parser');
const session = require('express-session');
const uuid = require('uuid');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;
const sessionConfig = {
  genid: (req) =>{
    return uuid()
  },
  store: new (require('connect-pg-simple')(session))(),
  key: 'user_sid',
  secret: 'weakfornow',
  resave: false,
  sameSite:true,
  httpOnly: true,
  saveUninitialized: false,
  cookie:{
  }
}

app.set('view engine', 'pug');
app.set('x-powered-by', false);
app.set('views', path.resolve(__dirname,"views"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.resolve(__dirname,"public")));
app.use(session(sessionConfig));

app.use(requestLogger);
app.use(routes);
app.use(errorLogging);
app.use(errorHandler);

app.get('*', function(req, res){
  res.sendStatus(404);
});
app.listen(port);

function errorLogging(err, req,res,next){
  
  if(process.env.NODE_ENV != 'production'){   
    console.error(err);
  }
  next(err);
};

function errorHandler(err, req,res,next){
  if(!err.statusCode){
    err.statusCode = 500;
  }

  res.sendStatus(err.StatusCode).json(err);
}
