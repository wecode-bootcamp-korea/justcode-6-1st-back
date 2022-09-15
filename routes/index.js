const express = require('express');

const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartsRouter = require('./cartsRouter');
const reviewsRouter = require('./reviewsRouter');

router.get('/', (req, res) => {
  res.json({ message: '/ pong' });
});

router.use(userRouter);
router.use(productRouter);
router.use('/carts', cartsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
