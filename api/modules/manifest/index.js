/**
 * 货单控制器
 */
const _router = require('express').Router();
const manifestModel = require('../../common/xmodel')('manifest');
const xres = require('../../common/xres');
const _ = require('lodash');
const async = require('async');
const manifestStatus = require('./constant').MANIFEST_STATUS;


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

            if (result.length) {
                result[0]._doc.create_user = result[0].create_user.name || result[0].create_user.username;
                return res.json(xres({ code: 0 }, result[0]));
            }
        });
    })

    // 更新货单状态
    .patch('/:manifest_id?', (req, res) => {
        let {status, manifests, description} = req.body;
        if (req.params.manifest_id) manifests = [req.params.manifest_id];


        let now = new Date();
        let updateQueue = manifests.map(manifest_id => cb => {
            let newData = {
                $set: { status, update_time: now },
                $push: { progress: { status, time: now, user: req.session.user_id, desc: description } }
            };
            manifestModel.update(manifest_id, newData, (result) => cb(null, result));
        });
        async.series(updateQueue, (err, result) => {
            res.json(xres({ code: 0 }, result));
        });
    })