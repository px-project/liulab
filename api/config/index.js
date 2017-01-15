/**
 * 后台配置
 */
const path = require('path');


// 数据库配置
exports.DB = {
    HOST: "127.0.0.1",
    PORT: "27017",
    NAME: "liulab"
};

// redis配置
exports.REDIS = {
    HOST: "127.0.0.1",
    PORT: "6379",
    NAME: "liulab"
};

// 密码混淆
exports.PWD_SEC = "5876564946d58cf8fe01b9f3";

// 上传目录
exports.UPLOAD_PATH = path.join(__dirname, '../../uploads/');