/**
 * 模型通用操作
 */
const mongoose = require('mongoose');
const utils = require('./utils');
const LIMIT = 20;

function handleDbErr(err) {
    throw err;
}


module.exports = function (modelDirName) {
    let name = utils.toCancel(true, modelDirName);

    let model = null;

    try {
        model = mongoose.model(name);
    } catch (e) {
        model = mongoose.model(name, new mongoose.Schema(require(`../${modelDirName}/schema`)));
    }

    return {
        list: (options = {}, cb) => {
            let { populateKeys = [], where = {}, skip = 0, limit = LIMIT } = options;

            model.find(where)
                .skip(skip)
                .limit(limit)
                .populate(populateKeys.join(' '))
                .exec((err, result) => {
                    if (err) handleDbErr(err);
                    cb(result);
                });
        },

        detail: (_id, options, cb) => {
            options.populateKeys = options.populateKeys || [];

            model.findOne({ _id })
                .populate(options.populateKeys.join(' '))
                .exec((err, result) => {
                    if (err) handleDbErr(err);
                    cb(result);
                });
        },

        create: (newData, cb) => {
            new model(newData).save((err, result) => {
                if (err) handleDbErr(err);
                cb(result);
            });
        },

        update: (_id, newData, cb) => {
            newData.$set = newData.$set || {};
            newData.$set.update_time = Date.now();
            model.update({ _id }, newData, (err) => {
                if (err) handleDbErr(err);
                cb({ update_time: newData.$set.update_time });
            });
        },

        upsert: (condition, newData, cb) => {
            model.findOneAndUpdate(condition, newData, { upsert: true }, (err, result) => {
                if (err) handleDbErr(err);
                cb(result);
            });
        },

        delete: (_id, cb) => {
            let newData = { $set: { isDeleted: false, update_time: Date.now() } };
            model.update({ _id }, newData, (err, result) => {
                if (err) handleDbErr(err);
                cb({ update_time: Date.now() });
            });
        }
    };
};
