/**
 * 路由分发
 */
const express = require('express');
const _router = express.Router();

// 顶级路由
['user', 'product', 'order', 'role', 'template'].forEach(function(name) {
    _router.use(`/${name}`, require(`../${name}`));   
});

module.exports = _router;