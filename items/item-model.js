const db = require('../data/dbConfig.js');

function createItem(item) {
  return db('items').insert(item);
}

function findItemById(id) {
  return db('items').where({id: id});
}

function findItemsByName(name) {
  return db('items').where({name: name});
}

function getItems() {
  return db('items');
}

function deleteItem(id) {
  return db('items').where({id: id}).del();
}

module.exports = {
  createItem,
  findItemById,
  findItemsByName,
  getItems,
  deleteItem
}
