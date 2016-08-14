/**
 * 代理商路由
 */
const express = require('express');
const _router = express.Router();
const agentModel = require('./model');
const xres = require('../common/xres');

// 代理商列表/详情
_router.get('/:agent_id?', (req, res) => {
    let {agent_id} = req.params;
    if (!agent_id) {
        // list
        agentModel.list({}, (err, result) => {
            if (err) throw err;

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
        agentModel.detail(agent_id, (err, result) => {
            if (err) throw err;

            let resData = {
                _id: result._id,
                name: result.name,
                linkman: result.linkman,
                phone: result.phone,
                address: result.phone,
                create_time: item.create_time,
                update_time: item.update_time
            };

            res.json(xres({ CODE: 0 }, resData));
        });
    }
});

// 添加代理商
_router.post('/', (req, res) => {
    let {name, linkman, phone, address} = req.body;
    let newData = {
        name,
        linkman,
        phone,
        address
    };

    agentModel.create(newData, (err, result) => {
        if (err) throw err;

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

});

// 删除代理商
_router.delete('/', (req, res) => {

});

// 代理商产品列表/详情
_router.get('/:agent_id/product/:product_id?', (req, res) => {
    
});

// 添加代理商产品
_router.post('/:agent_id/product', (req, res) => {
    
});

// 更新代理商产品
_router.patch('/:agent_id/product', (req, res) => {

});

// 删除代理商产品
_router.delete('/:agent_id/product', (req, res) => {

});

module.exports = _router;
