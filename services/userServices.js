const db = require('../db/queries');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const getAllUsers = function(req,res,next){
  //fetch all users from db
  //send out as json object to client
  res.send('getting all users');
};

const deleteUser = function(req,res,next){

}

const getUserById = function(req,res,next){
  let user = getUser(req.params.id);
  console.log(req.headers);
  res.send('geting user');
};

const updateUser = function(req,res,next){
  res.send('updating user!!');
};

const createUser = function(req,res,next){
  console.log(req.body)
  bcrypt.hash(req.body.password,10).then((hash)=>{
    let user = {
      displayName: req.body.name,
      email: req.body.email,
      hash: hash,
      accountType: req.body.isAdmin == 'true'?'admin':'user',
    }
    db.addUser(user)
    .then((userId)=>{
      user = user[0];
      req.session.isAuthenticated = true;
      console.log('user: ',user);
      req.session.user = {
        userId:userId[0],
      }
      console.log('I am in the add user callback, my session data is: ',req.session)
      res.redirect(301,'/users/profile');
    })
    .catch((err)=>{
      err.registerError = true;
      err.message = "This user already exists"
      next(err);
    });
  })
  
}

function loginUser(req,res,next){
  console.log('checking log in');
  console.log('body: ',req.body);
  let body = req.body
  if(!body.email || !body.password){
    let err = new Error('email or password is incorrect')
    err.loginError = true;
    next(err);
  }
  else{
    authenticateUser({email:body.email,password:body.password})
    .then((validUser)=>{
      console.log('here')
      if(validUser){
        req.session.user = {
          userId : validUser['user_id'],
          isAdmin : validUser['account_type'] == 'admin'? true:false
        }
        req.session.isAuthenticated = true;
        res.redirect('./profile');
      }
      else{
        let err = new Error('email or password is incorrect')
        err.loginError = true;
        next(err);
      }
  })
  }
  
}

function authenticateUser(user){

  return db.getHash(user.email)
  .catch((err)=>{
    return false
  })
  .then((info)=>{
    console.log('in authentication', info)
    return bcrypt.compare(user.password,info[0].hash)
    .then((result)=>{
      if(result == true){
        delete info[0].hash
        return info[0]
      }
      else{
        return result;
      } 
    })
  })
}


function checkUser(password,hash){
  return bcrypt.compare(password,hash)
}

function createJWT(){
  
}

function logoutUser(req,res,next){

}

module.exports = {
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  createUser
}