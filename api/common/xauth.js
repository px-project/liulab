/**
 * 验证中间件
 */
const xerr = require('../common/xerr');

module.exports = (req, res, next) => {

    // 登录接口
    if (req.url === '/user/login') return next();

    // 未登录
    if (!req.session || !req.session.online) return res.status(400).json(xerr('USER_NOT_LOGIN'));

    // 权限认证
    // todo

    next();
};
