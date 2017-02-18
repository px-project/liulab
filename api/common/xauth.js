/**
 * 验证中间件
 */
const xerr = require('../common/xerr');
const {PWD_SEC} = require('../config/');
const crypto = require('crypto');
const jws = require('jws');

module.exports = (req, res, next) => {

    // 登录接口
    // if (req.url === '/user/login') return next();

    // 未登录
    // if (!req.headers.token || !jws.verify(req.headers.token, 'HS256', PWD_SEC)) return res.status(400).json(xerr('USER_NOT_LOGIN'));

    // 权限认证
    // todo

    
    // req.user_id = JSON.parse(jws.decode(req.headers.token).payload).user_id;
    next();
};