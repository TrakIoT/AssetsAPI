const database = require('../util/db');

const getBatchById = (batchId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM Batch WHERE batch_id = ?";

    database.query(
        query,
        [batchId],
        function (err, result, fields) {
            if(err) { 
                reject(err);

                return;
            }

            resolve( result[0] );
        }
    );
  });
};

const createBatch = (productId, totalQuantity, expiringDate) => {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO Batch ( product_id, total_quantity, expiring_date, last_update) VALUES ( ?, ?, ?, NOW())";

    database.query(
        query,
        [productId, totalQuantity, expiringDate],
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

const updateBatchQuantity = (batchId, quantity) => {
  return new Promise(function (resolve, reject) {
    var query = "UPDATE Batch SET total_quantity = ? WHERE batch_id = ?";

    database.query(
        query,
        [quantity, batchId],
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

const sumQuantityBatches = (productId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT SUM(total_quantity) as total_quantity FROM Batch WHERE product_id = ?";

    database.query(
        query,
        [productId],
        function (err, result, fields) {
            if(err) { 
                reject(err);

                return;
            }

            resolve( result[0].total_quantity );
        }
    );
  });
};

module.exports = {
  createBatch,
  getBatchById,
  updateBatchQuantity,
  sumQuantityBatches
}