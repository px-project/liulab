/**
 * 操作Model
 */
const modelAction = require('../common/modelAction');
const AgentModel = require('./model');
const ProductModel = require('../product/model');
module.exports = modelAction(AgentModel);
