/**
 * 模型通用操作
 */
const mongoose = require('mongoose');
const utils = require('./utils');
const path = require('path');
const LIMIT = 20;

const commonSchema = {
    create_time: {          // 创建时间
        type: Date,
        default: Date.now
    },
    update_time: {          // 更新时间
        type: Date,
        default: Date.now
    },
    isDeleted: {            // 软删除
        type: Boolean,
        default: false
    }
}


/**
 * model
 */
function Xmodel(modelDirName) {
    let name = utils.toCancel(true, modelDirName);
    let model = null;
    try {
        model = mongoose.model(name);
    } catch (e) {
        model = mongoose.model(name, new mongoose.Schema(utils.merge(commonSchema, require(path.join(__dirname, `../modules/${modelDirName}/schema`)))));
    }
    this.model = model;
}


/**
 * model list action
 */
Xmodel.prototype.list = function (options = {}, cb) {
    let { populateKeys = [], where = {}, skip = 0, limit = LIMIT } = options;

    this.model.find(where)
        .skip(skip)
        .limit(limit)
        .populate(populateKeys.join(' '))
        .exec((err, result) => {
            if (err) return handleDbErr(err);
            cb(result);
        });
};


/**
 * model detail action
 */
Xmodel.prototype.detail = function (_id, options, cb) {
    options.populateKeys = options.populateKeys || [];

    this.model.findOne({ _id })
        .populate(options.populateKeys.join(' '))
        .exec((err, result) => {
            if (err) return handleDbErr(err);
            cb(result);
        });
};


/**
 * model create action
 */
Xmodel.prototype.create = function (newData, cb) {
    new this.model(newData).save((err, result) => {
        if (err) return handleDbErr(err);
        cb(result);
    });
};


/**
 * model update action
 */
Xmodel.prototype.update = function (_id, newData, cb) {
    newData.$set = newData.$set || {};
    newData.$set.update_time = Date.now();
    this.model.update({ _id }, newData, (err) => {
        if (err) return handleDbErr(err);
        cb({ update_time: newData.$set.update_time });
    });
};


/**
 * model upset action
 */
Xmodel.prototype.upsert = function (condition, newData, cb) {
    this.model.findOneAndUpdate(condition, newData, { upsert: true }, (err, result) => {
        if (err) return handleDbErr(err);
        cb(result);
    });
};


/**
 * omdel delete action 
 */
Xmodel.prototype.delete = function (_id, cb) {
    let update_time = Date.now();
    let newData = { $set: { isDeleted: false, update_time } };
    this.model.update({ _id }, newData, (err, result) => {
        if (err) return handleDbErr(err);
        cb({ _id, update_time });
    });
};


/**
 * model remve action
 */
Xmodel.prototype.remove = () => { }

/**
 * get model
 */
Xmodel.prototype.model = function () {
    return this.model;
};


module.exports = modelDirName => new Xmodel(modelDirName);