const { getLocationById, saveLocation } = require("../models/locations.models");

const locationGetController = async (request, response, next) => {
  const { location_id: locationId } = request.params;

  const result = await getLocationById(locationId);

  response.status(200).json(result);
};


const locationPostController = async (request, response, next) => {
  const { name, address, city, country } = request.body;

  const result = await saveLocation( name, address, city, country);

  if( result.affectedRows ){
    response.status(200).json({location_id: result.insertId});
  } else {
    response.status(500).json({message: "Error"});
  }
};

module.exports = { locationGetController, locationPostController };