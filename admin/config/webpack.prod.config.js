/**
 * 生产模式webpack配置
 */
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {

});
