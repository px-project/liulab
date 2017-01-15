/**
 * 数据库实例
 */
const mongoose = require('mongoose');
const config = require('../config/');

const dbUrl = 'mongodb://'
                + config.DB.HOST + ':'
                + config.DB.PORT + '/'
                + config.DB.NAME;

const db = mongoose.connect(dbUrl);

// 错误判断
mongoose.connection.on('error', (err) => {
    console.error(err);
});

module.exports = db;