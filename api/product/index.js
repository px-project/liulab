/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModelActions = require('./actions');
const xres = require('../common/xres');
const AgentModel = require('../agent/model');
const async = require('async');

// 产品列表/详情
_router.get('/:product_id?', (req, res) => {
    let { product_id } = req.params;
    if (!product_id) {
        // list
        productModelActions.list({}, (result) => {
            let resData = result.map((product) => {
                return {
                    _id: product._id,
                    name: product.name,
                    vender: product.vender,
                    specification: product.specification,
                    create_time: product.create_time,
                    update_time: product.update_time
                };
            });
            res.json(xres({ CODE: 0 }, resData));
        });
    } else {
        // detail
        productModelActions.detail(product_id, {}, (result) => {
            let resData = {
                _id: result._id,
                name: result.name,
                vender: item.vender,
                specification: result.specification,
                create_time: result.create_time,
                update_time: result.update_time
            };

            res.json(xres({ CODE: 0 }, resData));
        });
    }
});

// 创建产品
_router.post('/', (req, res) => {
    let { _id, name, vender, specification } = req.body;
    let newData = { _id, name, vender, specification };

    async.waterfall([
        (cb) => {
            productModelActions.detail(_id, {}, (result) => {
                if (!result) {
                    cb();
                    return;
                }
                res.json(xres({ CODE: 0 }, { "mes": "已存在" }));
            })
        },
        (cb) => {
            productModelActions.create(newData, (result) => {
                let resData = {
                    _id: result._id,
                    name: result.name,
                    vender: result.vender,
                    specification: result.specification,
                    create_time: result.create_time,
                    // update_time: result.update_time
                };

                res.json(xres({ CODE: 0 }, resData));
            });
        }
    ], (err) => {})
});


module.exports = _router;
