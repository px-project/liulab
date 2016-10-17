/**
 * 用户控制器
 */
const _router = require('express').Router();
const userModel = require('../common/xmodel')('user');
const xres = require('../common/xres');
const utils = require('../common/utils');
const xfilter = require('../common/xfilter');

module.exports = _router

    // 用户登录
    .post('/login', (req, res) => {

        let { username, password } = req.body;

        userModel.list({ where: { username }, populateKeys: ['role'] }, (result) => {
            console.log(result);

            // 不存在此用户
            if (!result.length) {

                res.json(xres({ code: 6001 }));
                return;
            }

            let user = result[0];

            // 密码不正确
            if (user.password !== utils.md5(password)) {
                res.json(xres({ code: 6002 }));
                return;
            }

            req.session.online = true;
            req.session.user_id = user._id;
            req.session.user_permission = user.role.permission;

            user.permission = user.role.permission;
            user.role_name = user.role.name;

            res.json(xres({ code: 0 }, xfilter(user, '_id', 'username', 'role_name', 'permission', 'name', 'phone', 'create_time', 'update_time')));
        });
    })


    // 用户登出
    .get('/logout', (req, res) => {
        req.session.online = false;

        res.json(xres({ code: 0 }));
    })


    // 用户列表
    .get('/', (req, res) => {
        userModel.list({populateKeys: ['role']}, (result) => {
            console.log(result);
            result.forEach((item) => item.role_name = item.role.name);
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'username', 'role_name', 'name', 'phone', 'create_time', 'update_time')));
        });
    })


    // 当前登录用户信息
    .get('/current', (req, res) => {
        let user_id = req.session.user_id;
        userModel.detail(user_id, {}, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'username', 'role', 'name', 'phone', 'create_time', 'update_time')));
        });
    })

    // 获取当前session状态
    .get('/status', (req, res) => {
        res.json(xres({ code: 0 }));
    })

    // 用户详情
    .get('/:user_id', (req, res) => {
        let {user_id} = req.params;
        userModel.detail(user_id, {}, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'username', 'role_id', 'name', 'phone', 'create_time', 'update_time')));
        });
    })


    // 创建用户
    .post('/', (req, res) => {
        let { username, password, role_id, name, phone } = req.body;

        userModel.list({ where: {username} }, (result) => {
            if (result.length) {
                res.json(xres({ code: 6004 }));
                return;
            }

            let newData = {
                username,
                password: utils.md5(password),
                role_id,
                name,
                phone
            };

            userModel.create(newData, (result) => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'create_time')));
            });
        });
    })



