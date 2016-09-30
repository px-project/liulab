/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModel = require('../common/xmodel')('product');
const xres = require('../common/xres');
const async = require('async');

// 产品列表/详情
_router.get('/:product_id?', (req, res) => {
    let { product_id } = req.params;
    if (!product_id) {
        // list
        productModel.list({}, (result) => {
            let resData = result.map((product) => {
                return {
                    _id: product._id,
                    code: product.code,
                    name: product.name,
                    vender: product.vender,
                    specification: product.specification,
                    agent: product.agent,
                    price: product.price,
                    create_time: product.create_time,
                    update_time: product.update_time
                };
            });
            res.json(xres({ CODE: 0 }, resData));
        });
    } else {
        // detail
        productModel.detail(product_id, {populateKeys: ['order']}, (result) => {
            let resData = {
                _id: result._id,
                code: product.code,
                name: result.name,
                vender: item.vender,
                specification: result.specification,
                create_time: result.create_time,
                update_time: result.update_time
            };

            res.json(xres({ CODE: 0 }, result));
        });
    }
});


// 创建产品
// _router.post('/', (req, res) => {
//     let { _id, name, vender, specification } = req.body;
//     let newData = { _id, name, vender, specification };

//     async.waterfall([
//         (cb) => {
//             productModel.detail(_id, {}, (result) => {
//                 if (!result) {
//                     cb();
//                     return;
//                 }
//                 res.json(xres({ CODE: 0 }, { "mes": "已存在" }));
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

//                 res.json(xres({ CODE: 0 }, resData));
//             });
//         }
//     ], (err) => {})
// });


module.exports = _router;
