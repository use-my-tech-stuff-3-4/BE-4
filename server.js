const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./users/user-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/users', userRoutes);

module.exports = server;
