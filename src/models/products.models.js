const database = require('../util/db');

const saveProduct = (uuid, name, totalQuantity) => {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO Product (product_id, name, total_quantity, last_update) VALUES (?, ?, ?, NOW())";

    database.query(
        query,
        [uuid, name, totalQuantity],
        function (err, result, fields) {
            if(err) { 
                reject(err);

                return;
            }

            resolve( result );
        }
    );
  });
}

module.exports = {
  saveProduct
}