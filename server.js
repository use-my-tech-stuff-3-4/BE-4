const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./users/user-router.js');
const itemRoutes = require('./items/item-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/users', userRoutes);
server.use('/api/items', itemRoutes);
server.get('/', (req, res) => {
  res.send('Welcome to the Rentech API. Please visit the <a href="https://documenter.getpostman.com/view/2146948/SzKYNGXK?version=latest" target="_blank">docs</a> for endpoint usage information.')
})

module.exports = server;
