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

const createUser = function(req,res){
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
      console.log(userId[0]);
      let token = jwt.sign({'user_id':userId[0]},process.env.JWT_SECRET,{expiresIn:240, algorithm:'HS256'})
      res.set({
        'Authorization':'Bearer '+token
      })
      res.redirect(301,'../');
    })
    .catch((err)=>{
      console.log(err);
      res.sendStatus(400)
    });
  })
  
}

function loginUser(req,res,next){
  console.log();
  //fetch user from DB
  // compare user pass hash to one proviced by user
  // if true sign token and send to user 
  // if false send err 
  let name = req.body.name;
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