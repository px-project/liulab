/**
 * 验证中间件
 */
const xres = require('./xres');


module.exports = (req, res, next) => {

    // 登录接口
    if (req.url === '/user/login') {
        next();
        return;
    }

    // 未登录
    if (!req.session.online) {
        res.json(xres({code: 6000}));
        return;
    }

    // 无权限
    // if () {
        // res.json(xres({code: 6001}));
    // }

    next();
};
