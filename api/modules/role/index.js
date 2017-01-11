/**
 * 角色控制器
 */
const _router = require('express').Router();
const roleHandlers = require('./handler');

module.exports = _router

    // 角色列表
    .get('/', (req, res) => {
        roleHandlers.list(req.l_query)
            .then(result => res.json(result));
    })

    // 角色详情
    .get('/:role_id', (req, res) => {
        roleHandlers.detail(req.params.role_id)
            .then(result => res.json(result));
    })

    // 添加角色
    .post('/', (req, res) => {
        roleHandlers.create(req.body)
            .then(result => res.json(result));
    })


    // 更新角色
    .patch('/:role_id', (req, res) => {
        roleHandlers.update(req.params.role_id, req.body)
            .then(result => res.json(result));
    })


    // 删除角色
    .delete('/:role_id', (req, res) => {
        roleHandlers.delete(req.params.role_id)
            .then(result => res.json(result));
    });