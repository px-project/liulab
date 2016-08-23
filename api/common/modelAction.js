/**
 * 模型通用操作
 */
module.exports = function (Model) {
    return {
        list: (condition, cb) => {
            Model.find(condition, (err, result) => {
                if (err) throw err;
                cb(result);
            });
        },

        detail: (_id, cb) => {
            Model.findOne({ _id }, (err, result) => {
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
