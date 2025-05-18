const express = require('express');
const cors = require('cors');

const auth = require('./routes/auth');
const product = require('./routes/product');
const cart = require('./routes/cart');
const track = require('./routes/track');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', auth);
app.use('/product', product);
app.use('/cart', cart);
app.use('/track', track);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
