const db = require('../db/queries');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getAllUsers = function(req,res,next){
  console.log(req.session)
  //fetch all users from db
  //send out as json object to client
  db.getAllUsers().then((data)=>{
    console.log('user-data: ',data)
    let filteredData = data.filter((user)=>{
      if(user.user_id != req.session.user.userId){
        return user
      }
    })
    console.log('user-data: ',data)
    res.json(filteredData);
  })
};

const deleteUser = function(req,res,next){

}

const getUserById = function(req,res,next){
  if(isNaN(req.params.id)){
    //user id isn't valid this gets sent to the 404 handler for now
    next();
  }
  else{
    res.send('geting user');
  }
};

const updateUser = function(req,res,next){
  res.send('updating user!!');
};

const createUser = function(req,res,next){
  bcrypt.hash(req.body.password,10).then((hash)=>{
    let user = {
      displayName: req.body.name,
      email: req.body.email,
      hash: hash,
      accountType: req.body.isAdmin == 'true'?'admin':'user',
    }
    user.imageUrl = req.body.image_url? req.body.image_url: 'https://loremflickr.com/300/300'
    db.addUser(user)
    .then((userId)=>{
      user = user[0];
      req.session.isAuthenticated = true;

      req.session.user = {
        userId:userId[0],
      }
      console.log('here')
      res.redirect(301,'/users/profile');
    })
    .catch((err)=>{
      res.redirect('/users/register?err=true')
    });
  })
  
}



function loginUser(req,res,next){
  let body = req.body
  if(!body.email || !body.password){
    res.redirect('/?err=true')
  }
  else{
    authenticateUser({email:body.email,password:body.password})
    .then((validUser)=>{
      if(validUser){
        req.session.user = {
          userId : validUser['user_id'],
          isAdmin : validUser['account_type'] == 'admin'? true:false
        }
        req.session.isAuthenticated = true;
        res.redirect('/users/profile');
      }
      else{
        res.redirect('/?err=true')
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
    if(info.length > 0){
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
    }
    else{
      return false;
    }
    
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