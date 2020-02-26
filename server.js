const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./users/user-router.js');
const itemRoutes = require('./items/item-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/users', userRoutes);
server.use('/api/items', itemRoutes);

module.exports = server;
