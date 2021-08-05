const database = require('../util/db');

const getCountFromBatchAndStowageId = (batchId, stowageId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM Register WHERE batch_id = ?";

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

const saveRegister = (Uuid, batchId, stowageId, quantity) => {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO Register (register_uuid, batch_id, stowage_id, quantity, last_update) VALUES (?, ?, ?, ?, NOW())";

    database.query(
        query,
        [Uuid, batchId, stowageId, quantity],
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

const searchRegister = (batchId, stowageId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM Register WHERE batch_id = ? AND stowage_id = ?";

    database.query(
        query,
        [batchId, stowageId],
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

const updateRegister = (Uuid, batchId, stowageId, quantity) => {
  return new Promise(function (resolve, reject) {
    var query = "UPDATE Register SET register_uuid = ?, quantity = ?, last_update = NOW() WHERE batch_id = ? AND stowage_id = ?";

    database.query(
        query,
        [Uuid, quantity, batchId, stowageId,],
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

const sumQuantityRegisters = (batchId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT SUM(quantity) as total_quantity FROM Register WHERE batch_id = ?";

    database.query(
        query,
        [batchId],
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
  saveRegister,
  getCountFromBatchAndStowageId,
  searchRegister,
  updateRegister,
  sumQuantityRegisters
}