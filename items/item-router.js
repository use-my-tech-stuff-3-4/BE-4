const express = require('express');

const router = express.Router();
const db = require('./item-model.js');

router.post('/', (req, res) => {
  db.createItem(req.body).then(response => {
    res.status(200).json({message: "Item successfully created", response});
  }).catch(err => {
    res.status(500).json({error: "Could not create item"});
  })
});

router.get('/', (req, res) => {
  db.getItems().then(items => {
    res.status(200).json({message: "Here are the items", items});
  }).catch(err => {
    res.status(500).json({error: "Could not get items"});
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getItemById(id).then(item => {
    res.status(200).json({message: "Here is the item", item});
  }).catch(err => {
    res.status(500).json({error: "Could not get item"});
  })
})

// Custom Middleware
function validation(req, res, next) {
  if (!req.body.name || !req.body.description || !req.body.price) {
    res.send({error: "Must provide item name, description, and price"});
  } else {
    next();
  }
}

module.exports = router;
