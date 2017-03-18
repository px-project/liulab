/**
 * 后台配置
 */
const path = require('path');
const { root } = require('../common/utils');

// 数据库配置
exports.DB = {
    // HOST: "139.129.29.110",
    HOST: "127.0.0.1",
    // PORT: "2017",
    PORT: 27017,
    NAME: "liulab"
};

// 密码混淆
exports.PWD_SEC = "5876564946d58cf8fe01b9f3";


// jwt私钥
exports.JWT_SEC = "asdadas";
exports.JWT_ALG = "HS256";

// 上传目录
exports.UPLOAD_PATH = root('../uploads');

// 错误文言
exports.ERROR_MESSAGE = {
    "USER_NOT_LOGIN": "当前用户未登录",
    "USER_ERR_LOGIN": "用户名或密码错误",
    "USER_NO_PERMISSTION": "当前操作无权限",
    "MANIFEST_STATUS_ERROR": "货单状态有误"
};
