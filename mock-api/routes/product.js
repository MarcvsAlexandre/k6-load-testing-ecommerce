const express = require('express');
const router = express.Router();
const products = require('../../data/products.json');

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    setTimeout(() => {
      res.json(product);
    }, 500); // simula delay
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

module.exports = router;
