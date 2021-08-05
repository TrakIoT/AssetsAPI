const database = require('../util/db');

const saveRegister = (registerId) => {
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