/**
 * 货单控制器
 */
const _router = require('express').Router();
const manifestModel = require('../../common/xmodel')('manifest');
const xres = require('../../common/xres');
const _ = require('lodash');


module.exports = _router

    // 批量下载货单
    .get('/download', (req, res) => {
    })

    // 货单列表
    .get('/', (req, res) => {
        manifestModel.list(_.mergeWith(req.l_query, { populateKeys: ['create_user'] }), result => {
            result.forEach(manifest => {
                manifest._doc.create_user = manifest.create_user.name || manifest.create_user.username;
            })
            res.json(xres({ code: 0 }, result));
        });
    })

    // 货单详情
    .get('/:manifest_id', (req, res) => {
        let {manifest_id} = req.params;
        manifestModel.list({ where: { manifest_id }, populateKeys: ['create_user'] }, result => {
            if (result.length) return res.json(xres({ code: 0 }, result[0]));
        });
    })

    // 更新货单
    .patch('/:manifest_id', (req, res) => {

    })