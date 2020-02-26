const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const db = require('./user-model.js');
const secrets = require('../data/secrets.js');

router.post('/register', validation, (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 8);
  credentials.password = hash;

  db.createUser(credentials).then(response => {
    db.findUserByUsername(credentials.username).first().then(user => {
      const token = generateToken(user);
      res.status(201).json({
        message: `Welcome, ${user.username}! Have a token...`,
        token
      });
    }).catch(err => {
      res.status(404).json({message: "A user with that username could not be found"});
    })
  }).catch(err => {
    res.status(500).json({message: "Could not register user"});
  })
});

router.get('/', (req, res) => {
  db.getUsers().then(users => {
    res.status(200).json({message: "Here are the users", users});
  }).catch(err => {
    res.status(500).json({message: "Could not get users"});
  })
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1hr',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

// Custom Middleware
function validation (req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.userType) {
    res.send({error: "Must provide username, password, and userType"})
  } else {
    next();
  }
}

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({message: "Invalid token"})
      } else {
        next();
      }
    })
  } else {
    res.status(401).json({message: "You shall not pass"})
  }
}

module.exports = router;
