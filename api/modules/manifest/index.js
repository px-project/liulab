/**
 * 货单控制器
 */
const _router = require('express').Router();
const _ = require('lodash');
const manifestHandlers = require('./handler');
const manifestStatus = require('./constant').MANIFEST_STATUS;
const xerr = require('../../common/xerr');

module.exports = _router

    // 批量下载货单
    .get('/download', (req, res) => {

    })

    // 货单列表
    .get('/', (req, res) => {
        manifestHandlers.list(_.mergeWith(req.l_query, { populateKeys: 'create_user' }))
            .then(result => res.json(result));
    })

    // 货单详情
    .get('/:manifest_id', (req, res) => {
        manifestHandlers.detail(req.params.manifest_id)
            .then(result => res.json(result));
    })

    // 更新货单状态
    .patch('/:manifest_ids', (req, res) => {
        let ids = req.params.manifest_ids.split(',');

        Promise.all(ids.map(id => manifestHandlers.updateStatus(id, _.mergeWith({}, req.body, { user: req.session.user_id }))))
            .then(result => res.json(result))
            .catch(error => res.status(402).json(xerr(error)));
    })