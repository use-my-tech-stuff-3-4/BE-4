const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const db = require('./user-model.js');
const secrets = require('../data/secrets.js');

router.post('/register', validation, (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;

  db.createUser(newUser).then(response => {
    db.getUserByUsername(newUser.username).first().then(user => {
      const token = generateToken(user);
      res.status(201).json({
        message: `User successfully created. Welcome, ${user.username}! Here is your token...`,
        token
      });
    }).catch(err => {
      res.status(400).json({message: "Error during user creation"});
    })
  }).catch(err => {
    res.status(500).json({message: "Could not register user"});
  })
});

router.post('/login', validation, (req, res) => {
  db.login(req.body).first().then(user => {
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      res.status(401).json({error: 'Invalid credentials'});
    } else {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome, ${user.username}! Have a token...`,
        token
      });
    }
  }).catch(err => {
    res.status(500).json({message: "Could not log in"});
  })
});

router.get('/', (req, res) => {
  db.getUsers().then(users => {
    const userIdArray = users.map(user => {
      user.items = [];
      return user.id;
    });
    db.getItems(userIdArray).then(items => {
      users.forEach(user => {
        items.forEach(item => {
          if (item.user_id === user.id) {
            user.items.push(item);
          }
        })
      })
      res.status(200).json({message: "Here are the users", users});
    });
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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db.updateUser(id, req.body).then(response => {
    db.getUserById(id).then(user => {
      res.status(200).json({message: "User successfully updated", user});
    }).catch(err => {
      res.status(404).json({message: "A user with that id does not exist"})
    })
  }).catch(err => {
    res.status(500).json({message: "Could not update user"});
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
