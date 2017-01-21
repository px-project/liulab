/**
 * 权限模块路由
 */
const _router = require('express').Router();
const permissionHandlers = require('./handler');

module.exports = _router

    // 权限列表
    .get('/', (req, res) => {
        permissionHandlers.list(req.l_query)
            .then(result => res.json(result));
    })

    // 权限详情
    .get('/:permission_id', (req, res) => {
        permissionHandlers.detail(req.params.permission_id)
            .then(result => res.json(result));
    })

    // 创建权限
    .post('/', (req, res) => {
        permissionHandlers.create(req.body)
            .then(result => res.json(result));
    })

    // 更新权限
    .patch('/:permission_id', (req, res) => {
        permissionHandlers.update(req.params.permission_id, req.body)
            .then(result => res.json(result));
    })