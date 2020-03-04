const express = require('express');

const router = express.Router();
const db = require('./item-model.js');

router.post('/', (req, res) => {
  db.createItem(req.body).then(response => {
    res.status(201).json({message: "Item successfully created"});
  }).catch(err => {
    res.status(500).json({message: "Could not create item", error: err});
  })
});

router.get('/', (req, res) => {
  db.getItems().then(items => {
    res.status(200).json({message: "Here are the items", items});
  }).catch(err => {
    res.status(500).json({error: "Could not get items"});
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.findItemById(id).then(item => {
    res.status(200).json({message: "Here is the item", item});
  }).catch(err => {
    res.status(500).json({error: "Could not get item"});
  })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db.updateItem(id, req.body).then(response => {
    db.findItemById(id).then(item => {
      res.status(200).json({message: "Item successfully updated", item});
    }).catch(err => {
      res.status(404).json({message: "An item with that id does not exist"})
    })
  }).catch(err => {
    res.status(500).json({message: "Could not update item"});
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.deleteItem(id).then(response => {
    res.status(200).json({message: "Item successfully deleted", response});
  }).catch(err => {
    res.status(500).json({message: "Could not delete item"});
  })
});

// Custom Middleware
function validation(req, res, next) {
  if (!req.body.name || !req.body.description || !req.body.price) {
    res.send({error: "Must provide item name, description, and price"});
  } else {
    next();
  }
}

module.exports = router;
