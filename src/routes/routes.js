const express = require('express');
const { productGetController, productPostController } = require('../controllers/products.controller');
const { locationGetController, locationPostController } = require('../controllers/locations.controller');

const router = express.Router();

router.get('/product/:product_id', productGetController);
router.post('/product', productPostController);

router.get('/location/:location_id', locationGetController);
router.post('/location', locationPostController);

module.exports = router;