/**
 * 路由分发
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const _router = express.Router();

// 顶级路由
fs.readdirSync(path.join(__dirname, '../modules/')).forEach((module) => {
    _router.use(`/${module}`, require(path.join(__dirname, `../modules/${module}`)));
});

module.exports = _router;