/**
 * webpack通用配置
 */
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const server = process.env.SERVER;

const root = exports.root = (...paths) => path.join(__dirname, '..', ...paths);

exports.config = {
    entry: {
        'polyfills': root('src/polyfills.js'),
        'vendor': root('src/vendor.js'),
        'app': root('src/app.js')
    },

    output: {
        path: root('build'),
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
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            hash: 'sha512',
                            digest: 'hex',
                            name: '[hash].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        }
                    }

                    // { test: /\.html$/, loader: 'html' }
                ]
            },
        ]
    },
    plugins: [
        // html替换
        new htmlWebpackPlugin({
            title: "liulab",
            filename: 'index.html',
            server,
            template: root('src/index.html'),
            chunksSortMode: 'auto'
        }),

        // 代码分离
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['app', 'vendor', 'polyfills']
        }),
    ]
};
