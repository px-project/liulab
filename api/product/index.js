/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModel = require('./model');


// 产品列表/详情
_router.get('/:product_id?', (req, res) => {
    let {product_id} = req.params;
    if (!product_id) {
        // list

    } else {
        // detail
        productModel.detail(product_id, (err, result) => {
            if (err) throw err;

            let resData = {
                _id: result._id,

            };

            res.json({ CODE: 0 }, resData);
        });
    }
});

// 创建产品
_router.post('/', (req, res) => {
    let {name, code, vender, specification, agent, price} = req.body;

});


module.exports = _router;