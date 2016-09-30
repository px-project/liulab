/**
 * 模型通用操作
 */
const mongoose = require('mongoose');
const utils = require('./utils');
const LIMIT = 20;

module.exports = function(modelName) {
    let schema = new mongoose.Schema(require(`../${modelName}/schema`));
    let model = mongoose.model(utils.toCancel(false, modelName), schema);

    return {
        list: (options = {}, cb) => {
            let { populateKeys = [], where = {}, skip = 0, limit = LIMIT } = options;
            model.find(where)
                .skip(skip)
                .limit(limit)
                .populate(populateKeys.join(' '))
                .exec((err, result) => {
                    if (err) throw err;
                    cb(result);
                });
        },

        detail: (_id, options, cb) => {
            options.populateKeys = options.populateKeys || [];

            model.findOne({ _id })
                .populate(options.populateKeys.join(' '))
                .exec((err, result) => {
                    if (err) throw err;
                    cb(result);
                });
        },

        create: (newData, cb) => {
            new model(newData).save((err, result) => {
                if (err) throw err;
                cb(result);
            });
        },

        update: (_id, newData, cb) => {
            newData.$set = newData.$set || {};
            newData.$set.update_time = Date.now();
            model.update({ _id }, newData, (err) => {
                if (err) throw err;
                cb({ update_time: newData.$set.update_time });
            });
        },

        delete: (_id, cb) => {
            let newData = { $set: { isDeleted: false, update_time: Date.now() } };
            model.update({ _id }, newData, (err, result) => {
                if (err) throw err;
                cb({ update_time: Date.now() });
            });
        }
    };
};
