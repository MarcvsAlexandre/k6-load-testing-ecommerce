const express = require('express');
const router = express.Router();

let cart = [];

router.post('/add', (req, res) => {
  const { productId } = req.body;
  if (productId) {
    cart.push(productId);
    setTimeout(() => {
      res.json({ success: true, items: cart });
    }, 300);
  } else {
    res.status(400).json({ error: 'Faltou productId' });
  }
});

router.get('/', (req, res) => {
  setTimeout(() => {
    res.json({ cart });
  }, 200);
});

module.exports = router;
