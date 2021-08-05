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

const getProducts = (limit, offset) => {
  return new Promise(function (resolve, reject) {
    var query = `SELECT * FROM Product ORDER BY last_update LIMIT ${limit} OFFSET ${offset}`;

    database.query(
        query,
        [],
        function (err, result, fields) {
            if(err) { 
                reject(err);

                return;
            }

            resolve(result);
        }
    );
  });
}

const searchProductByName = (name) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM Product WHERE LOWER(name) LIKE LOWER(?)";

    database.query(
        query,
        [`%${name}%`],
        function (err, result, fields) {
            if(err) { 
                reject(err);

                return;
            }

            resolve(result);
        }
    );
  });
};

const saveProduct = ( name, totalQuantity) => {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO Product ( name, total_quantity, last_update) VALUES ( ?, ?, NOW())";

    database.query(
        query,
        [ name, totalQuantity],
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
  saveProduct,
  searchProductByName,
  getProducts
}