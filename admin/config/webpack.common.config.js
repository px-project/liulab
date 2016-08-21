/**
 * webpack通用配置
 */
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        'app': './src/app.js',
    },

    output: {
        path: path.join(__dirname, '../build/'),
        filename: '[name].bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.scss']
    },

    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            { test: /\.json$/, loader: 'json' }
            // { test: /\.html$/, loader: 'html' }
        ]
    },

    plugins: [
        // html替换
        new htmlWebpackPlugin({
            title: "admin",
            template: './src/index.html',
            chunksSortMode: 'auto'
        }),
    ]
};
