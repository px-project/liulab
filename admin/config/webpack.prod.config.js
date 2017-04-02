/**
 * 生产模式webpack配置
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const { config, root } = require('./webpack.common.config');

module.exports = merge(config, {
    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
});
