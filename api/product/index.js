/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModel = require('../common/xmodel')('product');
const xres = require('../common/xres');
const async = require('async');
const xfilter = require('../common/xfilter');

module.exports = _router
    // 产品列表/详情
    .get('/:product_id?', (req, res) => {
        let { product_id } = req.params;
        if (!product_id) {
            // list
            productModel.list({}, (result) => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'code', 'name', 'vender', 'specification', 'create_time', 'update_time')));
            });
        } else {
            // detail
            productModel.detail(product_id, { populateKeys: ['order'] }, (result) => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'code', 'name', 'vender', 'specification', 'create_time', 'update_time')));
            });
        }
    });


// 创建产品
// .post('/', (req, res) => {
//     let { _id, name, vender, specification } = req.body;
//     let newData = { _id, name, vender, specification };

//     async.waterfall([
//         (cb) => {
//             productModel.detail(_id, {}, (result) => {
//                 if (!result) {
//                     cb();
//                     return;
//                 }
//                 res.json(xres({ code: 0 }, { "mes": "已存在" }));
//             })
//         },
//         (cb) => {
//             productModel.create(newData, (result) => {
//                 let resData = {
//                     _id: result._id,
//                     name: result.name,
//                     vender: result.vender,
//                     specification: result.specification,
//                     create_time: result.create_time,
//                     // update_time: result.update_time
//                 };

//                 res.json(xres({ code: 0 }, resData));
//             });
//         }
//     ], (err) => {})
// });


