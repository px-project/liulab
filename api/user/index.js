/**
 * 用户控制器
 */
const express = require('express');
const _router = express.Router();
const UserModelActions = require('./actions');
const xres = require('../common/xres');
const utils = require('../common/utils');

// 用户列表/详情
_router.get('/:user_id?', (req, res) => {
    let { user_id } = req.params;
    if (!user_id) {
        // list
        UserModelActions.list({}, (result) => {
            let resData = result.map((item) => {
                return {
                    _id: item._id,
                    username: item.username,
                    // password: item.password,
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
        UserModelActions.detail(user_id, {}, (result) => {
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
    UserModelActions.create(newData, (result) => {
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
    UserModelActions.list({ username: username }, (result) => {
        // 不存在此用户
        if (!result.length) {
            // todo
            return;
        }

        // 密码不正确
        if (result[0].password !== utils.md5(password)) {
            // todo
            return;
        }

        res.send({ "success": true });
    });
});


// 用户登出
_router.get('/logout', (req, res) => {
    res.send({ "success": true });
});


module.exports = _router;
