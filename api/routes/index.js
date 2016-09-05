/**
 * 路由分发
 */
const express = require('express');
const _router = express.Router();

// 用户
_router.use('/user', require('../user'));

// 产品
_router.use('/product', require('../product'));

// 订单
_router.use('/order', require('../order'));

// 角色
_router.use('/role', require('../role'));


// 资源
_router.use('/resource', require('../resource'));

// 代理商
// _router.use('/agent', require('../agent'));

module.exports = _router;