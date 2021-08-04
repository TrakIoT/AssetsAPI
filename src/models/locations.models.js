const database = require('../util/db');

const getLocationById = (locationId) => {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM Location WHERE location_id = ?";

    database.query(
        query,
        [locationId],
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

const saveLocation = (locationId, name, address, city, country) => {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO Location (location_id, name, address, city, country, last_update) VALUES (?, ?, ?, ?, ?, NOW())";

    database.query(
        query,
        [locationId, name, address, city, country],
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
  getLocationById,
  saveLocation
}