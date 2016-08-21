/**
 * 开发模式
 */
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        port: 9100,
        contentBase: './build',
        hot: true,
        inline: true,
        colors: true,
        historyApiFallback: true
    }
});
