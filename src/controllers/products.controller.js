const uuid = require('uuid');
const { saveProduct } = require("../models/products.models");

const productGetController = (request, response, next) => {
  const {product_id} = request.params;

  response.status(200).json(product_id);
};

const productPostController = async (request, response, next) => {
  const { name, total_quantity } = request.body;
  const productId = uuid.v4();

  const result = await saveProduct( productId, name, total_quantity ? total_quantity: 0);

  if( result.affectedRows ){
    response.status(200).json({product_id: productId});
  } else {
    response.status(500).json({message: "Error"});
  }
};

module.exports = { productGetController, productPostController };