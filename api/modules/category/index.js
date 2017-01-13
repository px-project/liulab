/**
 * 品类
 */
const _router = require('express').Router();
const categoryHandlers = require('../../common/xmodel')('category');

module.exports = _router

    // 列表
    .get('/', (req, res) => {
        categoryHandlers.list(req.l_query)
            .then(result => res.json(result));
    })


    // 详情
    .get('/:category_id', (req, res) => {
        categoryHandlers.detail(req.l_query)
            .then(result => res.json(result));
    })


    // 添加
    .post('/', (req, res) => {
        categoryHandlers.create(req.body)
            .then(result => res.json(result));
    })


    // 修改
    .patch('/:category_id', (req, res) => {
        categoryHandlers.update(req.params.category_id, req.body)
            .then(result => res.json(result));
    })


    // 删除
    .delete('/:category_id', (req, res) => {
        categoryHandlers.delete(req.params.category_id)
            .then(result => res.json(result));
    })


    // 当前品类最新编号
    .get('/:category_id/code', (req, res) => {
        categoryHandlers.code(req.params.category_id)
            .then(result => res.json({ code: result }));
    })