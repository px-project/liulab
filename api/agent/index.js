/**
 * 代理商路由
 */
const express = require('express');
const _router = express.Router();
const agentModelActions = require('./actions');
const productModelActions = require('../product/actions');
const xres = require('../common/xres');
const ProductModel = require('../product/model');
const async = require('async');
const AgentModel = require('../agent/model');

// 代理商列表/详情
_router.get('/:agent_id?', (req, res) => {
    let { agent_id } = req.params;
    if (!agent_id) {
        // list
        agentModelActions.list({}, (result) => {
            let resData = result.map((item) => {
                return {
                    _id: item._id,
                    name: item.name,
                    linkman: item.linkman,
                    phone: item.phone,
                    address: item.address,
                    create_time: item.create_time,
                    update_time: item.update_time
                };
            });

            res.json(xres({ CODE: 0 }, resData));
        });
    } else {
        // detail
        agentModelActions.detail(agent_id, {}, (result) => {
            let resData = {
                _id: result._id,
                name: result.name,
                linkman: result.linkman,
                phone: result.phone,
                address: result.phone,
                create_time: result.create_time,
                update_time: result.update_time
            };

            res.json(xres({ CODE: 0 }, resData));
        });
    }
});

// 添加代理商
_router.post('/', (req, res) => {
    let { name, linkman, phone, address } = req.body;
    let newData = { name, linkman, phone, address };

    agentModelActions.create(newData, (result) => {
        let resData = {
            _id: result._id,
            name: result.name,
            linkman: result.linkman,
            phone: result.phone,
            address: result.address
        };

        res.json(xres({ CODE: 0 }, resData));
    });
});


// 更新代理商
_router.patch('/', (req, res) => {
    let { _id, name, linkman, phone, address } = req.body;
    let newData = {
        $set: { _id, name, linkman, phone, address }
    };
    agentModelActions.update(_id, newData, (result) => {
        let resData = {
            _id: result._id,
            name: result.name,
            linkman: result.linkman,
            phone: result.phone,
            address: result.address
        };

        res.json(xres({ CODE: 0 }, resData));
    });
});


// 删除代理商
_router.delete('/', (req, res) => {

});


// 代理商产品列表/详情
_router.get('/:agent_id/product', (req, res) => {
    let { agent_id } = req.params;
    getagentProductList(agent_id, (resData) => {
        res.json(xres({ CODE: 0 }, resData));
    });
});

// 添加代理商产品
_router.post('/:agent_id/product', (req, res) => {
    let { agent_id } = req.params;
    let { name, code, vender, specification, price } = req.body;

    // 查询产品
    productModelActions.list({ where: {code} }, (result) => {
        if (result.length > 0) {
            // product表已存在此产品
            let updateAgentData = { $push: { products: { product: result[0]._id, price } } };

            agentModelActions.update(agent_id, newData, (result) => {
                // let updateProductData = {$push: {agents: {agent: agent_id, }}}
                getagentProductList(agent_id, (resData) => {
                    res.json(xres({ CODE: 0 }, resData));
                });
            });
        } else {
            // 不存在此产品，创建此产品
            let newProductData = { name, code, vender, specification, agents: [agent_id] };

            productModelActions.create(newProductData, (result) => {
                let newData = {
                    $push: { products: { product: result._id, price } }
                };
                agentModelActions.update(agent_id, newData, (result) => {
                    getagentProductList(agent_id, (resData) => {
                        res.json(xres({ CODE: 0 }, resData));
                    });
                });
            });
        }
    })


});


// 批量添加渠道商产品
_router.post('/:agent_id/products', (req, res) => {

});


// 更新代理商产品
_router.patch('/:agent_id/product', (req, res) => {

});

// 删除代理商产品
_router.delete('/:agent_id/product', (req, rews) => {

});


// 获取代理产品列表
function getagentProductList(agent_id, cb) {
    agentModelActions.detail(agent_id, { populateKeys: ['products.product'] }, (result) => {
        let resData = {
            _id: result._id,
            name: result.name,
            update_time: result.update_time,
            create_time: result.create_time
        };

        resData.products = result.products.map((product) => {
            return {
                _id: product.product._id,
                name: product.product.name,
                code: product.product.code,
                vender: product.product.vender,
                price: product.price,
                update_time: product.product.update_time,
                create_time: product.product.create_time
            };
        });

        cb(resData);
    });
}

module.exports = _router;
