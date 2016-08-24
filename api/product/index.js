/**
 * 产品控制器
 */
const express = require('express');
const _router = express.Router();
const productModelActions = require('./actions');
const xres = require('../common/xres');
const AgentModel = require('../agent/model');

// 产品列表/详情
_router.get('/:product_id?', (req, res) => {
    let { product_id } = req.params;
    if (!product_id) {
        // list
        productModelActions.list({ populateKeys: ['agents'] }, (result) => {
            let resData = [];
            result.map((product) => {
                product.agents.map((agent) => {
                    console.log(product.agents);
                    resData.push({
                        _id: product._id,
                        name: product.name,
                        code: product.code,
                        vender: product.vender,
                        specification: product.specification,
                        price: agent.price,
                        agent: {
                            _id: agent._id,
                            name: agent.name
                        },
                        create_time: product.create_time
                    });
                });
            });
            res.json(xres({ CODE: 0 }, resData));
        });
    } else {
        // detail
        productModelActions.detail(product_id, {}, (result) => {
            let resData = {
                _id: result._id,
                name: result.name,
                code: result.code,
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
    let { name, code, vender, specification } = req.body;
    let newData = { name, code, vender, specification };

    productModelActions.create(newData, (result) => {
        let resData = {
            _id: result._id,
            name: result.name,
            code: result.code,
            vender: result.vender,
            specification: result.specification,
            create_time: result.create_time
        };

        res.json(xres({ CODE: 0 }, resData));
    });

});


module.exports = _router;
