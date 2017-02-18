/**
 * 用户控制器
 */
const _router = require('express').Router();
const _ = require('lodash');
const jws = require('jws');
const {JWT_SEC, JWT_ALG, UPLOAD_PATH} = require('../../config/');
const xerr = require('../../common/xerr');
const userhandlers = require('./handler');
const resourceHandlers = require('../resource/handler');

module.exports = _router

    // 用户登录
    .post('/login', (req, res) => {
        let { username, password } = req.body;

        userhandlers.check(username, password).then(result => {
            res.json({
                token: jws.sign({
                    header: { alg: JWT_ALG },
                    secret: JWT_SEC,
                    payload: {
                        user_id: result._id
                    }
                })
            });
        }).catch(err => res.status(400).json(xerr(err)));
    })


    // 用户登出
    .get('/logout', (req, res) => {
        res.json({});
    })


    // 用户列表
    .get('/', (req, res) => {
        userhandlers.list(req.l_query)
            .then(result => res.json(result));
    })

    // 当前用户
    .get('/current', (req, res) => {
        userhandlers.detail(JSON.parse(jws.decode(req.headers.token).payload).user_id)
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

    // 用户头像
    .get('/:user_id/avatar', (req, res) => {
        resourceHandlers.detail(req.params.user_id, 'USER_AVATAR').then(result => {
            res.sendFile(uploadPath + result.file_name);
        }).catch(err => res.json(xerr(err)));
    })



