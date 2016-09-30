/**
 * 代理商路由
 */
const express = require('express');
const _router = express.Router();
const agentModel = require('../common/xmodel')('agent');
const productModel = require('../common/xmodel')('product');
const xres = require('../common/xres');
const async = require('async');

module.exports = _router
    // 代理商列表/详情
    .get('/:agent_id?', (req, res) => {
        let { agent_id } = req.params;
        if (!agent_id) {
            // list
            agentmodel.list({}, (result) => {
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

                res.json(xres({ code: 0 }, resData));
            });
        } else {
            // detail
            let { agent_id } = req.params;
            getAgentProductList(agent_id, (resData) => {
                res.json(xres({ code: 0 }, resData));
            });
        }
    })

    // 添加代理商
    .post('/', (req, res) => {
        let { name, linkman, phone, address } = req.body;
        let newData = { name, linkman, phone, address };

        agentmodel.create(newData, (result) => {
            let resData = {
                _id: result._id,
                name: result.name,
                linkman: result.linkman,
                phone: result.phone,
                address: result.address
            };

            res.json(xres({ code: 0 }, resData));
        });
    })


    // 更新代理商
    .patch('/', (req, res) => {
        let { _id, name, linkman, phone, address } = req.body;
        let newData = {
            $set: { _id, name, linkman, phone, address }
        };
        agentmodel.update(_id, newData, (result) => {
            let resData = {
                _id: result._id,
                name: result.name,
                linkman: result.linkman,
                phone: result.phone,
                address: result.address
            };

            res.json(xres({ code: 0 }, resData));
        });
    })


    // 删除代理商
    .delete('/', (req, res) => {

    })


    // 添加代理商产品
    .post('/:agent_id/product', (req, res) => {
        let { agent_id } = req.params;
        let { product_id, name, vender, specification, price } = req.body;

        async.waterfall([
            (Mb) => {
                productModel.detail(product_id, {}, (result) => {
                    if (!result) {
                        // 不M在此产品，创建
                        productModel.create({ _id: product_id, name, vender, specification }, (result) => {
                            cb(null, result._id);
                        });
                    } else {
                        cb(null, product_id);
                    }
                });
            },
            (product_id, cb) => {
                agentModel.detail(agent_id, {}, (agent) => {
                    // 查看当前代理是否已经存在改产品
                    let newProductList = agent.products;
                    let hasProd = false;
                    newProductList.map((item) => {
                        if (item.product === product_id) {
                            hasProd = true;
                            item.price = price;
                        }
                    });
                    if (!hasProd) newProductList.push({ product: product_id, price });

                    cb(null, newProductList);
                });
            },
            (newProductList, cb) => {
                agentModel.update(agent_id, { $set: { products: newProductList } }, () => {
                    cb(null);
                })
            },
            (cb) => {
                getAgentProductList(agent_id, (result) => {
                    res.json(xres({ code: 0 }, result));
                });
            }
        ], (err) => { })
    })


    // 批量添加渠道商产品
    .post('/:agent_id/products', (req, res) => {

    })


    // 更新代理商产品
    .patch('/:agent_id/product', (req, res) => {

    })

    // 删除代理商产品
    .delete('/:agent_id/product', (req, rews) => {

    });


// 获取代理产品列表
function getAgentProductList(agent_id, cb) {
    agentModel.detail(agent_id, { populateKeys: ['products.product'] }, (result) => {
        let resData = {
            _id: result._id,
            name: result.name,
            linkman: result.linkman,
            phone: result.phone,
            address: result.address,
            update_time: result.update_time,
            create_time: result.create_time
        };
        resData.products = result.products.map((prod) => {
            return {
                _id: prod.product._id,
                name: prod.product.name,
                vender: prod.product.vender,
                specification: prod.product.specification,
                price: prod.price,
                update_time: prod.product.update_time,
                create_time: prod.product.create_time
            };
        });

        cb(resData);
    });
}