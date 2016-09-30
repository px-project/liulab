/**
 * 用户控制器
 */
const _router = require('express').Router();
const userModel = require('../common/xmodel')('user');
const xres = require('../common/xres');
const utils = require('../common/utils');
const xfilter = require('../common/xfilter');

module.exports = _router


    // 用户列表/详情
    .get('/:user_id?', (req, res) => {
        let { user_id } = req.params;
        if (!user_id) {
            // list
            userModel.list({}, (result) => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'username', 'role_id', 'name', 'phone', 'create_time', 'update_time')));
            });

        } else {
            // detail
            userModel.detail(user_id, {}, (result) => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'username', 'role_id', 'name', 'phone', 'create_time', 'update_time')));
            });
        }
    })


    // 创建用户
    .post('/', (req, res) => {
        let { username, password, role_id } = req.body;
        let newData = {
            username,
            password: utils.md5(password),
            role_id
        };
        userModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'create_time')));
        });
    })


    // 用户登录
    .post('/login', (req, res) => {
        let { username, password } = req.body;
        userModel.list({ where: { username } }, (result) => {
            // 不存在此用户
            if (!result.length) {
                res.json(xres({ code: '此用户不存在' }));
                return;
            }

            // 密码不正确
            if (result[0].password !== utils.md5(password)) {
                res.json(xres({ code: '密码错误' }));
                return;
            }

            req.session.user_id = result[0]._id;
            req.session.role_id = result[0].role_id;

            let resData = {
                _id: result[0]._id,
                username: result[0].username,
                role_id: result[0].role_id,
                name: result[0].name,
                phone: result[0].phone,
                create_time: result[0].create_time,
                update_time: result[0].update_time
            };

            res.json(xres({ code: 0 }, resData));
        });
    })


    // 用户登出
    .get('/logout', (req, res) => {
        req.session = null;

        res.send(xres({ code: 0 }));
    });