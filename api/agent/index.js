/**
 * 代理商路由
 */
const express = require('express');
const _router = express.Router();
const agentModel = require('./model');
const productModel = require('../product/model');
const xres = require('../common/xres');

// 代理商列表/详情
_router.get('/:agent_id?', (req, res) => {
    let { agent_id } = req.params;
    if (!agent_id) {
        // list
        agentModel.list({}, (result) => {
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
        agentModel.detail(agent_id, (result) => {
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

    agentModel.create(newData, (result) => {
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
    agentModel.update(_id, newData, (result) => {
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
    productModel.list({code}, (result) => {
        if (result.length > 0) {
            // 已存在此产品
            let newData = { $push: { products: { _id: result[0]._id, price } } };

            agentModel.update(agent_id, newData, (result) => {
                getagentProductList(agent_id, (resData) => {
                    res.json(xres({ CODE: 0 }, resData));
                });
            });
        } else {
            // 不存在此产品，创建此产品
            let newProductData = { name, code, vender, specification };

            productModel.create(newProductData, (result) => {
                let newData = {
                    $push: { products: { _id: result._id, price } }
                };
                agentModel.update(agent_id, newData, (result) => {
                    getagentProductList(agent_id, (resData) => {
                        res.json(xres({ CODE: 0 }, resData));
                    });
                });
            });
        }
    })

});

// 更新代理商产品
_router.patch('/:agent_id/product', (req, res) => {

});

// 删除代理商产品
_router.delete('/:agent_id/product', (req, rews) => {

});


// 获取代理产品列表
function getagentProductList(agent_id, cb) {
    agentModel.detail(agent_id, (result) => {
        let resData = result;
        resData.products.map((prod, index) => {
            productModel.detail(prod._id, (productDetail) => {
                console.log(productDetail)
                resData.products[index] = {
                    _id: prod._id,
                    piece: prod.piece,
                    code: productDetail.code,
                    vender: productDetail.vender,
                    specification: productDetail.specification,
                    create_time: productDetail.create_time,
                    update_time: productDetail.update_time
                };
            });
        });
        console.log(resData);
        cb(resData);
    });
}





module.exports = _router;
