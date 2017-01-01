/**
 * 货单控制器
 */
const _router = require('express').Router();
const manifestModel = require('../../common/xmodel')('manifest');
const xres = require('../../common/xres');


module.exports = _router

    // 批量下载货单
    .get('/download', (req, res) => {

    })

    // 货单列表
    .get('/', (req, res) => {
        manifestModel.list({}, result => {
            res.json(xres({ code: 0 }, result));
        });
    })

    // 货单详情
    .get('/:manifest', (req, res) => {

    })

    // 更新货单
    .patch('/:manifest', (req, res) => {

    })