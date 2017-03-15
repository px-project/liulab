/**
 * webpack通用配置
 */
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const server = process.env.SERVER;

module.exports = {
    entry: {
        'polyfills': './src/polyfills.js',
        'vendor': './src/vendor.js',
        'app': './src/app.js',
        'login': './src/login.js'
    },

    output: {
        path: path.join(__dirname, '../build/'),
        filename: '[name].bundle.js'
    },

    externals: {
        // 'react': 'React',
        // 'react-router': 'ReactRouter',
        // 'react-dom': 'ReactDom',
        // 'redux': 'Redux',
        // 'react-redux': 'ReactRedux',
        'moment': 'moment',
        "loadsh": "_",
        "chart.js": "Chart",
        "downloadjs": "download"
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.jpeg', '.png']
    },

    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
            // { test: /\.html$/, loader: 'html' }
        ]
    },

    plugins: [
        // html替换
        new htmlWebpackPlugin({
            title: "liulab",
            filename: 'index.html',
            server,
            template: './src/index.html',
            chunksSortMode: 'auto',
            excludeChunks: ['login']
        }),

        new htmlWebpackPlugin({
            title: "登录",
            filename: 'login.html',
            server,
            template: './src/login.html',
            chunksSortMode: 'auto',
            excludeChunks: ['app', 'vendor', 'polyfills', 'common']
        }),

        // 代码分离
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['app', 'vendor', 'polyfills']
        }),
    ]
};
