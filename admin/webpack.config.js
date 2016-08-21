/**
 * webpack配置分发
 */
switch (process.env.NODE_ENV) {
    case "dev":
        // 开发模式
        module.exports = require('./config/webpack.dev.config');
        break;

    case "prod":
        // 生产模式
        module.exports = require('./config/webpack.prod.config');
        break;

    case "test":
        // 测试模式
        module.exports = require('./config/webpack.test.config');
        break;

    default:
        console.error("NODE_ENV配置错误");
}
