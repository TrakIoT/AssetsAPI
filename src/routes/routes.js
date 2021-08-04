const express = require('express');
const { productGetController, productPostController } = require('../controllers/products.controller');

const router = express.Router();

router.get('/product/:product_id', productGetController);
router.post('/product', productPostController);

module.exports = router;