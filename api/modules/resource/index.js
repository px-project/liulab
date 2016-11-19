/**
 * 资源路由
 */
const express = require('express');
const _router = express.Router();
const xres = require('../../common/xres');

module.exports = _router
    // 获取资源
    .get('/', (req, res) => {

    })

    // 创建资源
    .post('/', (req, res) => {
        res.json(xres({code: 0}, {filename: 'adasd.jpg'}));
    })