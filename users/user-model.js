const db = require('../data/dbConfig.js');

function createUser(user) {
  return db('users').insert(user);
}

function login(user) {
  return db('users').where('username', user.username);
}

function getUserById(id) {
  return db('users').where({id: id}).select('id', 'username', 'type');
}

function getUserByUsername(username) {
  return db('users').where({username: username}).select('id', 'username', 'type');
}

function getUsers() {
  return db('users').select('id', 'username', 'type');
}

function deleteUser(id) {
  return db('users').where({id: id}).del();
}

function getUserItems(id) {
  return db('items').where({user_id: id});
}

module.exports = {
  createUser,
  login,
  getUserById,
  getUserByUsername,
  getUsers,
  deleteUser,
  getUserItems
}
