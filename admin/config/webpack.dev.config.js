/**
 * 开发模式
 */
const merge = require('webpack-merge');
const { config, root } = require('./webpack.common.config');
const webpack = require('webpack');

module.exports = merge(config, {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devtool: 'source-map',

    devServer: {
        port: 9100,
        contentBase: root('build'),
        hot: true,
        inline: true,
        historyApiFallback: true
    },

});
