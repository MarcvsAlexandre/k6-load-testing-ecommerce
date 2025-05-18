const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Evento de tracking recebido:', req.body);
  setTimeout(() => {
    res.status(200).json({ success: true });
  }, 100);
});

module.exports = router;
