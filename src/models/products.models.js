const database = require('../util/db');

const getProductById = (productId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM Product WHERE product_id = ?";

    database.query(
        query,
        [productId],
        function (err, result, fields) {
            if(err) { 
                reject(err);

                return;
            }

            resolve(result[0]);
        }
    );
  });
};

const saveProduct = (productId, name, totalQuantity) => {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO Product (product_id, name, total_quantity, last_update) VALUES (?, ?, ?, NOW())";

    database.query(
        query,
        [productId, name, totalQuantity],
        function (err, result, fields) {
            if(err) { 
                reject(err);

                return;
            }

            resolve( result );
        }
    );
  });
};

module.exports = {
  getProductById,
  saveProduct
}