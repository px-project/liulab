/**
 * 模型通用操作
 */
const mongoose = require('mongoose');
const utils = require('./utils');
const path = require('path');
const _ = require('lodash');
const LIMIT = 20;

/**
 * model
 */
function Xmodel(modelDirName) {
    let name = utils.toBigCamel(modelDirName);
    let model = null;

    try {
        model = mongoose.model(name);
    } catch (e) {
        model = mongoose.model(name, new mongoose.Schema(require(path.join(__dirname, `../modules/${modelDirName}/schema`))));
    }

    this.model = model;
}


/**
 * model list action
 */
Xmodel.prototype.list = function (conditions = {}) {
    let { populateKeys = [], where = {}, skip = 0, limit = LIMIT } = conditions;
    if (typeof populateKeys === 'string') populateKeys = [populateKeys];

    let query = this.model.find(where);

    if (skip) query = query.skip(skip);
    if (limit >= 0) query = query.limit(limit);
    if (populateKeys.length) query = query.populate(populateKeys.join(' '));

    return query.exec();
};


/**
 * model detail action
 */
Xmodel.prototype.detail = function (_id, conditions = {}) {
    let {populateKeys = []} = conditions;
    if (typeof populateKeys === 'string') populateKeys = [populateKeys];

    let query = this.model.findById(_id);
    if (populateKeys.length) query = query.populate(populateKeys.join(' '));

    return query.exec();
};


/**
 * model create action
 */
Xmodel.prototype.create = function (newData = {}) {
    return new this.model(newData).save();
};


/**
 * model update action
 */
Xmodel.prototype.update = function (_id, newData = {}) {
    delete newData.create_time;
    delete newData.is_deleted;
    newData.update_time = Date.now();

    return this.model.findByIdAndUpdate(_id, newData).then(result => _.mergeWith(result, newData));
};


/**
 * model upset action
 */
Xmodel.prototype.upsert = function (conditions = {}, newData = {}) {
    return this.model.findOneAndUpdate(conditions, newData, { upsert: true });
};


/**
 * omdel delete action 
 */
Xmodel.prototype.delete = function (_id) {
    return this.model.findByIdAndUpdate(_id, { is_deleted: true, update_time: Date.now() });
};


/**
 * model remve action
 */
Xmodel.prototype.remove = () => { }


module.exports = model => new Xmodel(model);