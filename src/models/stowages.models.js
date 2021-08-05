const database = require('../util/db');

const getStowageById = (stowageId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM Stowage WHERE stowage_id = ?";

    database.query(
        query,
        [stowageId],
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

const saveStowage = (locationId) => {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO Stowage (location_id, last_update) VALUES ( ?, NOW())";

    database.query(
        query,
        [locationId],
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
  getStowageById,
  saveStowage
}