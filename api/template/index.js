/**
 * 产品类型字段模板
 */
const _router = require('express').Router();
const templateModel = require('../common/xmodel')('template');
const xres = require('../common/xres');

module.exports = _router

    // 列表 / 详情
    .get('/:template_id?', (req, res) => {
        
    })


    // 添加
    .post('/', (req, res) => {

    })


    // 修改
    .patch('/:template_id', (req, res) => {

    })


    // 删除 
    .delete('/:template_id', (req, res) => {

    });
