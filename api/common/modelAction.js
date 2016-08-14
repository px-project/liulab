/**
 * 模型通用操作
 */
module.exports = function (Model) {
    return {
        list: (condition, cb) => {
            Model.find(condition, cb);
        },

        detail: (_id, cb) => {
            Model.findOne({ _id }, cb);
        },

        create: (newData, cb) => {
            new Model(newData).save(cb);
        },

        update: (_id, newData, cb) => {
            Model.update({ _id }, newData, cb);
        },

        delete: (_id, cb) => {
            Model.update({ _id }, { isDeleted: false }, cb);
        }
    };
};