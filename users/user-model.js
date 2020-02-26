const db = require('../data/dbConfig.js');

function createUser(user) {
  return db('users').insert(user);
}

function findUserById(id) {
  return db('users').where({id: id});
}

function findUserByUsername(username) {
  return db('users').where({username: username});
}

function getUsers() {
  return db('users');
}

function deleteUser(id) {
  return db('users').where({id: id}).del();
}

module.exports = {
  createUser,
  findUserById,
  findUserByUsername,
  getUsers,
  deleteUser
}
