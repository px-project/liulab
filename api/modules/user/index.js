/**
 * 用户控制器
 */
const _router = require('express').Router();
const userhandlers = require('./handler');
const utils = require('../../common/utils');
const _ = require('lodash');
const pwdSec = require('../../config/').PWD_SEC;
const xerr = require('../../common/xerr');

module.exports = _router


    // 用户登录
    .post('/login', (req, res) => {
        let { username, password } = req.body;

        userhandlers.check(username, password)
            .then(result => {
                req.session.online = true;
                req.session.user_id = result._id;
                req.session.role_id = result.role;

                res.json(result);
            })
            .catch(err => {
                res.status(400).json(xerr(err));
            });
    })


    // 用户登出
    .get('/logout', (req, res) => {
        req.session.online = false;
        res.json({});
    })


    // 用户列表
    .get('/', (req, res) => {
        userhandlers.list(req.l_query)
            .then(result => res.json(result));
    })

    // 当前用户
    .get('/current', (req, res) => {
        userhandlers.detail(req.session.user_id)
            .then(result => res.json(result));
    })


    // 用户详情
    .get('/:user_id', (req, res) => {
        let {user_id} = req.params;
        userhandlers.detail(req.params.user_id)
            .then(result => res.json(result));
    })



    // 创建用户
    .post('/', (req, res) => {
        userhandlers.create(req.body)
            .then(result => res.json(result));
    })


    // 更新用户
    .patch('/:user_id', (req, res) => {
        userhandlers.update(req.params.user_id, newData)
            .then(result => res.json(result));
    })



