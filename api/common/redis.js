/**
 * redis配置
 */
const redis = require('redis');
const config = require('../config/index.json');

module.exports = redis.createClient(config.redis.DB_PORT, config.redis.DB_HOST);