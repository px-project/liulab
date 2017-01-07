/**
 * 处理查询条件中间件
 */
const _ = require('lodash');

module.exports = (req, res, next) => {
    let query = _.cloneDeepWith(req.query);

    let result = req.l_query = {};

    ['limit', 'skip'].forEach(key => {
        result[key] = query[key];
        delete query[key];
    });

    result.where = query;

    next();
};