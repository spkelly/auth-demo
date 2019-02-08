const knex = require('./index');
const now = knex.fn.now;

function getUserById(id){
  return knex('users')
  .where('user_id',id)
  .catch((err)=>{
    console.log(err)
  })
}


function getAllUsers(){
  return knex('users').select([
    'display_name',
    'email'
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

function addUser(user){
  return knex('users')
  .insert({
    "display_name": user.displayName,
    "email":user.email,
    "account_type":user.accountType,
    "hash": user.hash,
    "created_at": knex.fn.now(),
    "updated_at": knex.fn.now()
  })
  .returning('user_id')
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
  getAllUsers
}