const registerPostController = async (request, response, next) => {
  const register = request.body;

  const result = await saveLocation( locationId, name, address, city, country);

  // if( result.affectedRows ){
  //   response.status(200).json({location_id: locationId});
  // } else {
  //   response.status(500).json({message: "Error"});
  // }
};

module.exports = { registerPostController };