const knex = require('./index');
const now = knex.fn.now;

function getUserById(id){
  return knex('users')
  .where('user_id',id)
  .select('display_name','email','image_url')
  .catch((err)=>{
    console.log(err)
  })
}


function getAllUsers(){
  return knex('users').select([
    'display_name',
    'user_id',
    'image_url'
  ])
  .catch((err)=>{
    console.log(err);
  })
}

function updateUser(id,changes){
  return knex('users')
  .where('user_id',id)
  .update({'updated_at':knex.fn.now(),...changes})
  .catch((err)=>{
    console.log(err);
  })
}

function getHash(email){
  return knex('users')
  .where('email',email)
  .select([
    'user_id',
    'account_type',
    'hash'
  ])
}

function addUser(user){
  return knex('users')
  .insert({
    "display_name": user.displayName,
    "email":user.email,
    "account_type":user.accountType,
    "image_url": user.profileImage,
    "hash": user.hash,
    "created_at": knex.fn.now(),
    "updated_at": knex.fn.now()
  })
  .returning('user_id','account_type')
}

function deleteUser(id){
  return knex('users')
  .where("id",id)
  .del();
}


module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getHash
}