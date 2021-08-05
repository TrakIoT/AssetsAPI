const { saveRegister, searchRegister, updateRegister, sumQuantityRegisters } = require("../models/registers.models");
const { createBatch, getBatchById, updateBatchQuantity, sumQuantityBatches } = require("../models/batches.models");
const { getStowageById } = require("../models/stowages.models");
const { getProductById, updateProductQuantity } = require("../models/products.models");

const registerPostController = async (request, response, next) => {
  let register = request.body;

  const product = await getProductById(register.product_id);

  if( !product ) {
    response.status(404).json({message: "PRODUCT_NOT_FOUND"});
  }

  const stowage = await getStowageById(register.stowage_id);

  if( !stowage ) {
    response.status(404).json({message: "STOWAGE_NOT_FOUND"});
  }

  const batch = await getBatchById(register.batch_id);

  if( !batch ){
    const newBatchResult = await createBatch(register.product_id, 0, register.expiring_date.replace("T", " ").replace("Z", " "));
    register.batch_id = newBatchResult.insertId;
  } else if (batch.product_id != register.product_id) {
    response.status(404).json({message: "BATCH_DOES_NOT_CORRESPOND_TO_PRODUCT"});
  }

  const foundRegister = await searchRegister(register.batch_id, register.stowage_id);

  if(!foundRegister) {
    const result = await saveRegister( register.register_id, register.batch_id, register.stowage_id, register.quantity);
  } else {
    const result = await updateRegister(register.register_id, register.batch_id, register.stowage_id, register.quantity);
  }

  const batchTotalQuantity = await sumQuantityRegisters(register.batch_id);
  await updateBatchQuantity(register.batch_id, batchTotalQuantity);

  const productTotalQuantity = await sumQuantityBatches(register.product_id);
  await updateProductQuantity(register.product_id, productTotalQuantity);

  response.status(200).json("ok");

  // 

  // if( result.affectedRows ){
  //   response.status(200).json({location_id: locationId});
  // } else {
  //   response.status(500).json({message: "Error"});
  // }
};

module.exports = { registerPostController };