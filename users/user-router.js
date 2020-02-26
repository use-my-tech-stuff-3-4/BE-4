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
        message: `User successfully created. Welcome, ${user.username}! Here is your token...`,
        token
      });
    }).catch(err => {
      res.status(404).json({message: "Error during user creation"});
    })
  }).catch(err => {
    res.status(500).json({message: "Could not register user"});
  })
});

router.post('/login', validation, (req, res) => {
  const credentials = req.body;

  db.login(req.body).first().then(user => {
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      res.status(401).json({error: 'Invalid credentials'});
    } else {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!, have a token...`,
        token
      });
    }
  }).catch(err => {
    res.status(500).json({message: "Could not log in"});
  })
});

router.get('/', (req, res) => {
  db.getUsers().then(users => {
    res.status(200).json({message: "Here are the users", users});
  }).catch(err => {
    res.status(500).json({message: "Could not get users"});
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getUserById(id).then(user => {
    res.status(200).json({message: "Here is the user", user});
  }).catch(err => {
    res.status(500).json({message: "Could not get user"});
  })
});

router.get('/:id/items', (req, res) => {
  const { id } = req.params
  db.getUserItems(id).then(items => {
    res.status(200).json({message: "Here are the user's items", items});
  }).catch(err => {
    res.status(500).json({message: "Could not get user's items"});
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.deleteUser(id).then(response => {
    res.status(200).json({message: "User successfully deleted", response});
  }).catch(err => {
    res.status(500).json({message: "Could not delete user"});
  })
});

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
  if (!req.body.username || !req.body.password) {
    res.send({error: "Must provide username and password"})
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
