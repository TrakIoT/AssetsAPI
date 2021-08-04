const productGetController = (request, response, next) => {
  const {product_id} = request.params;

  response.status(200).json(product_id);
};

module.exports = { productGetController };