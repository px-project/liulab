/**
 * 用户控制器
 */
const _router = require('express').Router();
const userhandlers = require('./handler');
const utils = require('../../common/utils');
const _ = require('lodash');
const config = require('../../config/index.json');

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


    // 用户详情
    .get('/:user_id', (req, res) => {
        let {user_id} = req.params;
        // 当前登录用户详情
        if (user_id === 'current') user_id = req.session.user_id;

        userhandlers.detail(req.params.user_id)
            .then(result => res.json(result));
    })


    // 创建用户
    .post('/', (req, res) => {
        let newData = _.cloneDeepWith(req.body);
        newData.password = utils.md5(config.pwd_sec + newData.password);

        userhandlers.create(newData)
            .then(result => res.json(result));
    })


    // 更新用户
    .patch('/:user_id', (req, res) => {
        let newData = _.cloneDeepWith(req.body);
        if (newData.password) newData.password = utils.md5(config.pwd_sec + newData.password);

        userhandlers.update(req.params.user_id, newData)
            .then(result => res.json(result));
    })



