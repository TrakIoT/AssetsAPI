const { saveStowage } = require("../models/stowages.models");

const stowagePostController = async (request, response, next) => {
  const {location_id: locationId} = request.body;

  const result = await saveStowage(locationId);

  if( result.affectedRows ){
    response.status(200).json({stowage_id: result.insertId});
  } else {
    response.status(500).json({message: "Error"});
  }
};

module.exports = { stowagePostController };