/**
 * 生产模式webpack配置
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
});
