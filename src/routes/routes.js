const express = require('express');
const { productGetController } = require('../controllers/products.controller');

const router = express.Router();

router.get('/product/:product_id', productGetController);

router.use(function(req, res, next) {
    response = { 
        message: 'URL not found'
    };

    res.status(404).send(response);
});

module.exports = router;