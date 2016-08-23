/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModel = require('./model');


// 产品列表/详情
_router.get('/:product_id?', (req, res) => {
    let { product_id } = req.params;
    if (!product_id) {
        // list
        productModel.list({}, (result) => {
            let resData = result.map((item) => {
                return {
                    _id: item._id,
                    name: item.name,
                    code: item.code,
                    vender: item.vender,
                    specification: item.specification,
                    create_time: item.create_time,
                    update_time: item.update_time
                };
            });
        });
    } else {
        // detail
        productModel.detail(product_id, (result) => {
            let resData = {
                _id: result._id,
                name: result.name,
                code: result.code,
                vender: item.vender,
                specification: result.specification,
                create_time: result.create_time,
                update_time: result.update_time
            };

            res.json({ CODE: 0 }, resData);
        });
    }
});

// 创建产品
_router.post('/', (req, res) => {
    let { name, code, vender, specification } = req.body;
    let newData = { name, code, vender, specification };

    productModel.create(newData, (result) => {
        let resData = {
            _id: result._id,
            name: result.name,
            code: result.code,
            vender: result.vender,
            specification: result.specification,
            create_time: result.create_time
        };

        res.json({ CODE: 0 }, resData);
    });

});


module.exports = _router;
