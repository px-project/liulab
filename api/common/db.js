/**
 * 数据库实例
 */
const mongoose = require('mongoose');
const config = require('../config/index.json');

const dbUrl = 'mongodb://'
                + config.db.DB_HOST + ':'
                + config.db.DB_PORT + '/'
                + config.db.DB_NAME;

const db = mongoose.connect(dbUrl);

// 错误判断
mongoose.connection.on('error', (err) => {
    console.error(err)
});

module.exports = db;