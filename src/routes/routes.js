const express = require('express');
const { productGetByIdController, productGetController, productSearchByNameController, productPostController } = require('../controllers/products.controller');
const { locationGetController, locationPostController } = require('../controllers/locations.controller');
const { registerPostController } = require('../controllers/registers.controller');
const { stowagePostController } = require('../controllers/stowages.controller');

const router = express.Router();

router.get('/product/:product_id', productGetByIdController);
router.get('/product/name/:name', productSearchByNameController);
router.get('/product/limit/:limit/offset/:offset', productGetController);
router.post('/product', productPostController);

router.get('/location/:location_id', locationGetController);
router.post('/location', locationPostController);

router.post('/register', registerPostController);
router.post('/stowage', stowagePostController);

module.exports = router;