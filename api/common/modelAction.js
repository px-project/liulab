/**
 * 模型通用操作
 */
const LIMIT = 20;


module.exports = function(Model) {
    return {
        list: (options = {}, cb) => {
            let { populateKeys = [], where = {}, skip = 0, limit = LIMIT } = options;
            Model.find(where)
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

            Model.findOne({ _id })
                .populate(options.populateKeys.join(' '))
                .exec((err, result) => {
                    if (err) throw err;
                    cb(result);
                });
        },

        create: (newData, cb) => {
            new Model(newData).save((err, result) => {
                if (err) throw err;
                cb(result);
            });
        },

        update: (_id, newData, cb) => {
            newData.$set = newData.$set || {};
            newData.$set.update_time = Date.now();
            Model.update({ _id }, newData, (err) => {
                if (err) throw err;
                cb({ update_time: newData.$set.update_time });
            });
        },

        delete: (_id, cb) => {
            let newData = { $set: { isDeleted: false, update_time: Date.now() } };
            Model.update({ _id }, newData, (err, result) => {
                if (err) throw err;
                cb({ update_time: Date.now() });
            });
        }
    };
};
