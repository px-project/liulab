/**
 * 后台配置
 */
const path = require('path');


// 数据库配置
exports.DB = {
    HOST: "139.129.29.110",
    PORT: "27017",
    NAME: "liulab"
};

// redis配置
exports.REDIS = {
    HOST: "139.129.29.110",
    PORT: "6379",
    NAME: "liulab"
};

// 密码混淆
exports.PWD_SEC = "5876564946d58cf8fe01b9f3";

// 上传目录
exports.UPLOAD_PATH = path.join(__dirname, '../../uploads/');

// 错误文言
exports.ERROR_MESSAGE = {
    "NOT_LOGIN": "当前用户未登录",
    "ERR_LOGIN": "用户名或密码错误",
    "NO_PERMISSTION": "当前操作无权限"
};
