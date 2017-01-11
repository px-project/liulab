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
        categoryModel.update(req.params.category_id, req.body)
            .then(result => res.json(result));
    })


    // 删除
    .delete('/:category_id', (req, res) => {
        categoryModel.delete(req.params.category_id)
            .then(result => res.json(result));
    })
