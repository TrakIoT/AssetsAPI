const uuid = require('uuid');
const { getProductById, saveProduct } = require("../models/products.models");

const productGetController = async (request, response, next) => {
  const { product_id: productId } = request.params;

  const result = await getProductById(productId);

  response.status(200).json(result);
};

const productPostController = async (request, response, next) => {
  const { name, total_quantity: totalQuantity } = request.body;
  const productId = uuid.v4();

  const result = await saveProduct( productId, name, totalQuantity ? totalQuantity: 0);

  if( result.affectedRows ){
    response.status(200).json({product_id: productId});
  } else {
    response.status(500).json({message: "Error"});
  }
};

module.exports = { productGetController, productPostController };