/**
 * redis配置
 */
const redis = require('redis');
const config = require('../config/');

module.exports = redis.createClient(config.REDIS.PORT, config.REDIS.HOST);