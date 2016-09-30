/**
 * 用户控制器
 */
const express = require('express');
const _router = express.Router();
const userModel = require('../common/xmodel')('user');
const xres = require('../common/xres');
const utils = require('../common/utils');

// 用户列表/详情
_router.get('/:user_id?', (req, res) => {
    let { user_id } = req.params;
    if (!user_id) {
        // list
        userModel.list({}, (result) => {
            let resData = result.map((item) => {
                return {
                    _id: item._id,
                    username: item.username,
                    role_id: item.role_id,
                    name: item.name,
                    phone: item.phone,
                    create_time: item.create_time,
                    update_time: item.update_time
                }
            });

            res.json(xres({ CODE: 0 }, resData));
        });

    } else {
        // detail
        userModel.detail(user_id, {}, (result) => {
            let resData = {
                _id: result._id,
                username: result.username,
                role_id: result.role_id,
                name: result.name,
                phone: result.phone,
                create_time: result.create_time,
                update_time: result.update_time
            };

            res.json(xres({ CODE: 0 }, resData));
        });
    }
});


// 创建用户
_router.post('/', (req, res) => {
    let { username, password, role_id } = req.body;
    let newData = {
        username,
        password: utils.md5(password),
        role_id
    };
    userModel.create(newData, (result) => {
        let resData = {
            _id: result._id,
            create_time: result.create_time
        };
        res.json(xres({ CODE: 0 }, resData));
    });
});


// 用户登录
_router.post('/login', (req, res) => {
    let { username, password } = req.body;
    userModel.list({ where: { username } }, (result) => {
        // 不存在此用户
        if (!result.length) {
            res.json(xres({ CODE: '此用户不存在' }));
            return;
        }

        // 密码不正确
        if (result[0].password !== utils.md5(password)) {
            res.json(xres({ CODE: '密码错误' }));
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

        res.json(xres({ CODE: 0 }, resData));
    });
});


// 用户登出
_router.get('/logout', (req, res) => {
    req.session = null;

    res.send(xres({ CODE: 0 }));
});


module.exports = _router;
