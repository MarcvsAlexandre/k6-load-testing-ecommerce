const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { user, pass } = req.body;
  if (user && pass) {
    return res.json({ token: 'mock-token-12345' });
  }
  res.status(400).json({ error: 'Credenciais inválidas' });
});

module.exports = router;
