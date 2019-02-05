const env = process.env.NODE_ENV || "development";
const config = rquire('./config')[env];
const knex = require('knex')(config);

modules.exports ={
  db : knex
}